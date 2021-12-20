import { GetSentInvoiceServices } from './../../services/sent-invoice-service';
import { Routes, Router, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../auth.service';
import { BasicService } from '../../services/basic.service';
import { TransferMoney } from '../../services/transfermoney.service';
import { AlertController, Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { GetPaymentRequestServices } from 'src/services/get-payment-request';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';


@Component({
  selector: 'app-invoices-sent-to-users',
  templateUrl: './invoices-sent-to-users.page.html',
  styleUrls: ['./invoices-sent-to-users.page.scss'],
})
export class InvoicesSentToUsersPage implements OnInit {
  allInvoices: any[] = []
  user_email: string = localStorage.getItem('user_email');
  individualInvoices: any[] = [];
  showOptions: boolean = false;
  constructor(private location: Location,
    private authService: AuthService,
    private basicServices: BasicService,
    private transferMoneyService: TransferMoney,
    private platform: Platform,
    private modalController: ModalController,
    private getSentInvoiceServices: GetSentInvoiceServices,
    private file: File,
    private alertController: AlertController,
    private router: Router,
    private fileOpener: FileOpener) { }

  ngOnInit() {
    this.getAllInvoices();
  }

  goHome() {
    this.router.navigateByUrl('/home', {
      replaceUrl: true,
    })
  }

  getAllInvoices() {
    const formData = new FormData();
    formData.append('email', this.user_email);
    this.basicServices.showLoding();
    this.getSentInvoiceServices.getSentInvoiceRequest(formData).then(data => {
      console.log(data);
      if (data && data.response) {
        if (data.response.hasOwnProperty('error')) {
          throw data.response.error;
        } else {
          console.log(data);
          this.allInvoices = data.response;
          console.log(this.allInvoices);
          this.populateIndividualInvoices();
        }
      }
    }).catch(e => {
      this.authService.Toast(e.message);
    }).finally(() => {
      this.basicServices.hideLoading();
    })
  }
  populateIndividualInvoices() {
    let individualInvoice = {};
    for (let invoice of this.allInvoices) {
      const id = invoice.id;
      const amount = invoice.amount;
      const invoice_date = invoice.invoice_date;
      const invoice_number = invoice.invoice_number;
      const from_name = invoice.from_name;
      const from_email = invoice.from_email;
      const to_name = invoice.to_name;
      const to_email = invoice.to_email;
      const created_at = invoice.created_at;
      const updated_at = invoice.updated_at;  
      const address = invoice.address;
      const purpose = invoice.purpose;
      
      individualInvoice = {
        id,
        invoice_date,
        invoice_number,
        from_name,
        from_email,
        to_name,
        to_email,
        amount,
        created_at,
        updated_at,
        address,
        purpose,
      }
      this.individualInvoices.push(individualInvoice);
    }
    console.log(this.individualInvoices);
  }

  viewInvoice(index: number) {
    for (let i = 0; i < this.individualInvoices.length; i++) {
      if (i == index){
        const invoice = {
          amount: this.individualInvoices[i].amount,
          id: this.individualInvoices[i].id,
          invoice_date: this.individualInvoices[i].invoice_date,
          invoice_due_date: this.individualInvoices[i].invoice_due_date,
          invoice_number: this.individualInvoices[i].invoice_number,
          from_name: this.individualInvoices[i].from_name,
          from_email: this.individualInvoices[i].from_email,
          to_name: this.individualInvoices[i].to_name,
          to_email: this.individualInvoices[i].to_email,
          created_at: this.individualInvoices[i].created_at,
          updated_at: this.individualInvoices[i].updated_at,
          address: this.individualInvoices[i].address,
          purpose: this.individualInvoices[i].purpose,
          invoice_type: 'users',
        }

        let navigationExtras: NavigationExtras = {
          queryParams: {
            invoiceParams: JSON.stringify(invoice),
          }
        }

        this.router.navigate(['single-invoice'], navigationExtras);
      }
    }
  }  

  showInvoiceOptions(i: number) {
    const invoices = this.allInvoices.map((item: any, index: any) => {
      if (index === i) {
        return item;
      }
      return {
        ...item,
        showOptions: false
      }
    })
    this.allInvoices = invoices;
    if(this.allInvoices[i].showOptions) {
      this.allInvoices[i].showOptions = false;
      return;
    }
    this.allInvoices[i].showOptions = true;
  }  

  goBack(): any {
    this.location.back();
  }
}
