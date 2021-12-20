import { Router } from '@angular/router';
import { RaiseInvoiceServices } from './../../services/raise-invoice-service';
import { CheckCustomerServices } from 'src/services/check-customer-service';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { EditInvoiceDateAndNumberComponent } from '../edit-invoice-date-and-number/edit-invoice-date-and-number.component';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { BasicService } from '../../services/basic.service';
import { TransferMoney } from '../../services/transfermoney.service';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-raise-invoice',
  templateUrl: './raise-invoice.page.html',
  styleUrls: ['./raise-invoice.page.scss'],
})
export class RaiseInvoicePage implements OnInit {

  invoice: any = {
    invoice_number: '1',
    invoice_date: 'Invoice Date',
    invoice_due_date: 'Due Date'
  };
  invoice_number: string = '';
  invoice_date: string = '';
  invoice_due_date: string = '';
  allCustomers: any[] = [];
  allUsers: any[] = [];
  individualCustomers: any[] = [];
  individualUsers: any[] = [];
  hideCustomerList: boolean = true;
  selectedCustomer: string = '';
  first_name: string = '';
  last_name: string = '';
  name: string = '';
  email: string = '';
  raiseInvoiceForm: FormGroup;
  submitted = false;
  user_name = '';
  user_email = '';
  pdf_obj = null;
  constructor(private location: Location,
    private authService: AuthService,
    private basicServices: BasicService,
    private transferMoneyService: TransferMoney,
    private checkCustomerService: CheckCustomerServices,
    private platform: Platform,
    private modalController: ModalController,
    private raiseInvoiceServices: RaiseInvoiceServices,
    public formBuilder: FormBuilder,
    private file: File,
    private router: Router,
    private alertController: AlertController,
    private fileOpener: FileOpener) { }

  ngOnInit() {
    this.validateForm();
    //this.getAllUsers();
    this.populateUserDetails();
  }

  goHome() {
    this.router.navigateByUrl('/home', {
      replaceUrl: true,
    })
  }

  validateForm() {
    this.raiseInvoiceForm = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      customer_name: ['', [Validators.required, Validators.minLength(3)]],
      customer_email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      user_name: ['', [Validators.required, Validators.minLength(3)]],
      user_email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      purpose: ['', [Validators.required, Validators.minLength(10)]],
      address: ['', [Validators.required, Validators.minLength(10)]],
    })
  }

  get errorCtr() {
    return this.raiseInvoiceForm.controls;
  }

  populateUserDetails() {
    this.user_email = localStorage.getItem('user_email');
    this.user_name = localStorage.getItem('user_name');
    this.raiseInvoiceForm.controls.user_name.setValue(this.user_name);
    this.raiseInvoiceForm.controls.user_email.setValue(this.user_email);
  }

  goBack(): any {
    this.location.back();
  }

  populateIndividualCustomers() {
    let individualCustomer = {};
    for (let customer of this.allCustomers) {
      let first_name = customer.individual.first_name;
      let last_name = customer.individual.last_name;
      let email = customer.individual.email;
      individualCustomer = {
        first_name,
        last_name,
        email,
      }
      this.individualCustomers.push(individualCustomer);
    }
    console.log(this.individualCustomers);
  }

  populateIndividualUsers() {
    let individualUser = {};
    for (let user of this.allUsers) {
      let name = user.name;
      let email = user.email;
      individualUser = {
        name,
        email,
      }
      this.individualUsers.push(individualUser);
    }
    console.log(this.individualUsers);
  }

  onInvoiceSubmit() {
    this.submitted = true;
    if (!this.raiseInvoiceForm.valid) {
      console.log('All fields are required');
      return false;
    } else {
      console.log(this.raiseInvoiceForm.value);
      this.basicServices.showLoding('Raising Invoice...').then(() => {
        this.submitInvoiceRequest();
        //this.raiseInvoice();
        
      });
      
    }
  }

  showCustomers() {
    this.hideCustomerList = false;
  }

  hideCustomers() {
    //this.hideCustomerList = true;
  }

  getAllCustomers() {
    this.basicServices.showLoding();
    this.transferMoneyService.getAllCustomers().then(data => {
      console.log(data)
      if (data && data.response && data.response.data) {
        this.allCustomers = data.response.data;
        console.log(this.allCustomers);
        this.populateIndividualCustomers();
      }
      this.basicServices.hideLoading();
    }).catch(e => {
      this.authService.Toast(e.message);
    }).finally(() => {
      this.basicServices.hideLoading();
    })
  }

  getAllUsers() {
    this.basicServices.showLoding();
    this.transferMoneyService.getAllUsers().then(data => {
      console.log(data);
      this.allUsers = data;
      this.populateIndividualUsers()
    }).catch(e => {
      this.authService.Toast(e.message);
    }).finally(() => {
      this.basicServices.hideLoading();
    })    
  }

  async showEditDialog() {
    const modal = await this.modalController.create({
      component: EditInvoiceDateAndNumberComponent,
      cssClass: 'edit-invoice-modal-dialog',
    });

    modal.onDidDismiss().then((invoice) => {
      console.log(invoice);
      this.setInvoiceDateAndNumber(invoice)
    })
    return await modal.present();
  }

  setInvoiceDateAndNumber(invoice: any) {
    this.invoice_date = invoice.data.invoice_date;
    this.invoice_due_date = invoice.data.invoice_due_date;
    this.invoice_number = invoice.data.invoice_number;

    this.invoice = {
      invoice_date: this.invoice_date,
      invoice_due_date: this.invoice_due_date,
      invoice_number: this.invoice_number
    }

    console.log('Invoice Date:' + this.invoice_date)
  }

  onCustomerItemClick(first_name: string, last_name: string, email: string) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.hideCustomerList = true;
    this.raiseInvoiceForm.controls.customer_name.setValue(this.first_name + ' ' + this.last_name);
    this.raiseInvoiceForm.controls.customer_email.setValue(this.email);
    console.log(first_name, last_name);
  }

  onUserItemClick(name: string, email: string) {
    this.name = name;
    this.email = email;
    this.hideCustomerList = true;
    this.raiseInvoiceForm.controls.customer_name.setValue(this.name);
    this.raiseInvoiceForm.controls.customer_email.setValue(this.email);
    //console.log(first_name, last_name);
  }  

  submitInvoice() {
    const formData = new FormData();
    formData.append('amount', this.raiseInvoiceForm.controls.amount.value);
    formData.append('customer_name', this.raiseInvoiceForm.controls.customer_name.value);
    formData.append('customer_email', this.raiseInvoiceForm.controls.customer_email.value);
    formData.append('user_name', this.raiseInvoiceForm.controls.user_name.value);
    formData.append('user_email', this.raiseInvoiceForm.controls.user_email.value);
    formData.append('invoice_date', this.invoice_date);
    formData.append('invoice_due_date', this.invoice_due_date);
    formData.append('invoice_number',this.invoice_number);
    formData.append('user_id', localStorage.getItem('user_id'));
    formData.append('purpose', this.raiseInvoiceForm.controls.purpose.value);
    formData.append('address', this.raiseInvoiceForm.controls.address.value);
    this.sendInvoice(formData);
  }

  submitInvoiceRequest() {
    const formData = new FormData();
    // formData.append('invoice_number', this.raiseInvoiceForm.controls.invoice_no.value);
    formData.append('amount', this.raiseInvoiceForm.controls.amount.value);
    formData.append('to_name', this.raiseInvoiceForm.controls.customer_name.value);
    formData.append('to_email', this.raiseInvoiceForm.controls.customer_email.value);
    formData.append('from_name', this.raiseInvoiceForm.controls.user_name.value);
    formData.append('from_email', this.raiseInvoiceForm.controls.user_email.value);
    formData.append('purpose', this.raiseInvoiceForm.controls.purpose.value);
    formData.append('address', this.raiseInvoiceForm.controls.address.value);
    this.raiseInvoiceRequest(formData);
  }

  sendInvoice(formData: FormData) {
    this.raiseInvoiceServices.raiseInvoice(formData).then(data => {
      console.log(data);
      if(data && data.response) {
        if (data.response.hasOwnProperty('error')){
          throw data.response.error;
        } else {
            console.log(data.response);
            this.showSuccessMessage(data.response['message'])
        }
      }
      this.basicServices.hideLoading();
    })
  }

  raiseInvoiceRequest(formData: FormData) {
    this.raiseInvoiceServices.raiseRequest(formData).then(data => {
      console.log(data);
      if(data && data.response) {
        if (data.response.hasOwnProperty('error')){
          throw data.response.error;
        } else {
            console.log(data.response);
            if (data.status === 'true') {
              this.showSuccessMessage(data.response['message'])
            } else {
              this.showFailureMessage(data.response)
            }
        }
      }
      this.basicServices.hideLoading();
    })
  }

  showSuccessMessage(message: string) {
    const successButtons = [
      {
        text: 'OK',
        handler: () => {
          //this.raiseInvoice();
          this.navigateToInvoiceDashboard();
        }
      }
    ];
    this.alertController.create({
      header: "Success",
      message: `Your request of $${this.raiseInvoiceForm.controls.amount.value} to ${this.raiseInvoiceForm.controls.customer_name.value} is sent successfully`,
      buttons: successButtons,
    }).then(res => {
      res.present();
    });
  }

  showFailureMessage(message: string) {
    const buttons = [
      {
        text: 'OK',
      }
    ];
    this.alertController.create({
      header: "Failure",
      message,
      buttons: buttons,
    }).then(res => {
      res.present();
    });
  }

  navigateToInvoiceDashboard(){
    this.router.navigateByUrl('/invoice-dashboard');
  }

  checkCustomerAdded() {
    const formData = new FormData();
    formData.append('email', this.user_email);
    this.checkCustomerService.checkCustomerRequest(formData).then(data => {
      
    })
  }

  raiseInvoice() {
    var dd = {
      content: [
        {
            columns: [
                {
                    text: 'INVOICE',
                    style: 'header'
                },
                {
                    text: 'ORIGINAL FOR RECEPIENT',
                    style: 'header1'
                },
                
            ],
        },
        {
            text: this.raiseInvoiceForm.controls.user_name.value,
            style: 'header1'
        },
        {
            text: this.raiseInvoiceForm.controls.user_email.value,
        },
        {
            canvas: [{
                type: 'line',
                lineWidth: 4,
                x1: 0, 
                y1: 0, 
                x2: 515, 
                y2: 0
            }],
            style: 'line_separator'
        },
        {
            table: {
                body: [
                    [
                        {
                            border: [true, true, true, true],
                            // text: 'Invoice No. 1\tInvoice Date 02-09-2021\tInvoice Due Date 08-09-2021'
                            text: 'Invoice No. ' + this.invoice_number + '\t' + 'Invoice Date ' + this.invoice_date + '\t' + 'Invoice Due Date ' + this.invoice_due_date
                        },
                    ]
                ],
                
            },
            style: 'invoice_details',
        },
        {text: 'BILL TO', style: 'header2'},
        {text: this.raiseInvoiceForm.controls.customer_name.value, style: 'header1'},
        {text: this.raiseInvoiceForm.controls.customer_email.value},
        {
            canvas: [{
                type: 'line',
                lineWidth: 4,
                x1: 0, 
                y1: 0, 
                x2: 515, 
                y2: 0
            }],
            style: 'line_separator'
        },
        {
            columns: [
                {
                    width: '50%',
                    text: 'ITEMS',
                    style: 'header'
                },
                {
                    width: '50%',
                    text: 'AMOUNT',
                    style: 'header'
                },
                
            ],
            style: 'invoice_details',
            columnGap: 350,
        },
        {
            canvas: [{
                type: 'line',
                lineWidth: 2,
                x1: 0, 
                y1: 0, 
                x2: 515, 
                y2: 0
            }],
            style: 'line_separator'
        },
        {
            columns: [
            {
                width: '70%',
                text: 'Payment Towards ' + this.raiseInvoiceForm.controls.customer_name.value,
                style: 'line_separator',
            },
            {
                width: '30%',
                text: '$' + this.raiseInvoiceForm.controls.amount.value,
                style: 'line_separator',
            },
           ],
           columnGap: 350,
        },
        {
            columns: [
            {
                width: '70%',
                text: 'SUBTOTAL',
                style: 'header1',
            },
            {
                width: '30%',
                text: '$' + this.raiseInvoiceForm.controls.amount.value,
                style: 'header1',
            },
           ],
           columnGap: 350,
         },
         {
            canvas: [{
                type: 'line',
                lineWidth: 4,
                x1: 0, 
                y1: 0, 
                x2: 515, 
                y2: 0
            }],
            style: 'line_separator'
        },
        {
            columns: [
            {
                width: '70%',
                text: 'TAXABLE AMOUNT',
                style: 'taxable_amount',
            },
            {
                width: '30%',
                text: '$0',
                style: 'taxable_amount',
            },
           ],
           columnGap: 350,
            },
            {
            columns: [
            {
                width: '70%',
                text: 'TOTAL',
                style: 'taxable_amount',
            },
            {
                width: '30%',
                text: '$' + this.raiseInvoiceForm.controls.amount.value,
                style: 'taxable_amount',
            },
           ],
           columnGap: 350,
            },
            {
            columns: [
            {
                width: '70%',
                text: 'RECEIVED AMOUNT',
                style: 'taxable_amount',
            },
            {
                width: '30%',
                text: '$0',
                style: 'taxable_amount',
            },
           ],
           columnGap: 350,
            },
            {
            canvas: [{
                type: 'line',
                lineWidth: 4,
                x1: 0, 
                y1: 0, 
                x2: 515, 
                y2: 0
            }],
            style: 'line_separator'
        },
            {
            columns: [
            {
                width: '70%',
                text: 'BALANCE',
                style: 'taxable_amount',
            },
            {
                width: '30%',
                text: '$' + this.raiseInvoiceForm.controls.amount.value,
                style: 'taxable_amount',
            },
           ],
           columnGap: 350,
            },
            {
                text: 'Invoice amount (in words)',
                style: 'taxable_amount',
            },
            {
                text: '',
                style: 'header1'
            }
      ],
      styles: {
          header: {
            fontSize: 18,
              bold: true,
              margin: [0, 0, 0, 10]
          },
          
          header1: {
            fontSize: 14,
              bold: true,
              margin: [0, 0, 0, 0]
          },
          header2: {
            fontSize: 16,
              bold: true,
              margin: [0, 10, 0, 0]
          },
          line_separator: {
              margin: [0, 10, 0, 0]
          },
          invoice_details: {
              margin: [0, 10, 0, 0],
          },
          taxable_amount: {
              margin: [0, 10, 0, 0],
              bold: true,
              fontSize: 14,
          }
      }
    }
    this.pdf_obj = pdfMake.createPdf(dd);
    this.openPDF();
  }

  openPDF() {
    if(this.platform.is('cordova')){
      this.pdf_obj.getBuffer(buffer => {
        let blob = new Blob([buffer], { type: 'application/pdf' });

        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'invoice.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'invoice.pdf', 'application/pdf');
        })
      })
    } else {
      this.pdf_obj.download();
    }
  }
}
