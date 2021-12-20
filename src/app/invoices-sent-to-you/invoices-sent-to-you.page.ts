import { GetWalletServices } from './../../services/get-wallet';
import { CheckCustomerServices } from './../../services/check-customer-service';
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
  selector: 'app-invoices-sent-to-you',
  templateUrl: './invoices-sent-to-you.page.html',
  styleUrls: ['./invoices-sent-to-you.page.scss'],
})
export class InvoicesSentToYouPage implements OnInit {

  allInvoices: any[] = []
  user_email: string = localStorage.getItem('user_email');
  individualInvoices: any[] = [];
  showOptions: boolean = false;
  isCustomer = false;
  selectedTransferAmount: any = {};
  availableBalance: any = null;
  totalTransferAmount: any = {};
  availableBalanceInDollars: any = {};

  constructor(private location: Location,
    private authService: AuthService,
    private basicServices: BasicService,
    private transferMoneyService: TransferMoney,
    private platform: Platform,
    private modalController: ModalController,
    private getPaymentRequestServices: GetPaymentRequestServices,
    private checkCustomerServices: CheckCustomerServices,
    private file: File,
    private walletService: GetWalletServices,
    private alertController: AlertController,
    private router: Router,
    private fileOpener: FileOpener) { }

  ngOnInit() {
    this.getAllInvoices();
    this.getWalletBalance();
  }

  goBack(): any {
    this.location.back();
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
    this.getPaymentRequestServices.getPaymentRequest(formData).then(data => {
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
        purpose
      }
      this.individualInvoices.push(individualInvoice);
    }

    console.log(this.individualInvoices);
  }

  payUser(index: number){
    for (let i = 0; i < this.individualInvoices.length; i++) {
      if ( i === index) {
        this.confirmPayout(this.individualInvoices[i])
      }
    }
  }

  confirmPayout(invoice: any) {
    this.calculateTotalTransferAmount(parseInt(invoice.amount));
    console.log(`invoice.amount: ${invoice.amount}`);
    console.log(`totalTransferAmount: ${this.totalTransferAmount}`);
    if (this.totalTransferAmount && this.totalTransferAmount > 0) {
      const confirmationMessage = "Your Wallet Balance is $" + this.availableBalance + ". " +
      "Do you want to pay this customer? " +
      "An extra 2% of the transfer amount " + 
      "would be levied as fees from your wallet account." + 
      "Hence the total amount will be $" + this.totalTransferAmount + ".";
      const confirmationButtons = [
        {
          text: 'Yes',
          handler: () => {
            this.transferingFund(invoice);
          },
        },
        {
          text: 'No',
          handler: () => {
            // Exit the dialog
          }
        }
      ];
      this.showPayConfirmationDialog('Pay Out', confirmationMessage, confirmationButtons);
    }
  } 

  transferingFund(invoice: any): any {
    const amount = parseInt(invoice.amount)
    
    if (amount && amount > 0) {
      this.basicServices.showLoding('Paying Amount...');
      this.totalTransferAmount = amount + (amount * 0.02);
      const amountInCents = parseFloat(this.totalTransferAmount) * 100.0
      const data = {
        amount: amountInCents.toString(),
        id: invoice.id,
        user_id: localStorage.getItem('user_id'),
      };
      this.transferMoneyService.tranferingFund(data).then(data => {
        console.log(`this.availableBalance: ${this.availableBalance}`)
        if (this.availableBalance && parseFloat(this.availableBalance) >= parseInt(invoice.amount)) {
          this.authService.Toast('Successfully Transferd');
        } else {
          this.authService.Toast("No sufficient balance");
        }
      }).catch(e => {
        this.authService.Toast(e.message);
      }).finally(() => {
        this.basicServices.hideLoading();
      });
    }
  }

  getWalletBalance() {
    const formData = new FormData();
    formData.append('user_id', localStorage.getItem('user_id'))
    this.walletService.getWallet(formData).then(data => {
      console.log(`getWalletBalance: ${JSON.stringify(data)}`);
      if (data && data.response) {
        if (data.response.hasOwnProperty('error')) {
          throw data.response.error;
        } else {
          const amountInCents = parseInt(data.response['amount'])
          const amountInDollars =  amountInCents/100;
          console.log(`amountInDollars: ${amountInDollars.toString()}`);
          this.availableBalance = amountInDollars.toString();
          console.log(`this.availableBalance: ${this.availableBalance}`);
        }
      }
    })
  }

  calculateTotalTransferAmount(amount: number) {
    console.log(`Total Transfer Amount: ${amount + (amount * 0.02)}`);
    this.totalTransferAmount = amount + (amount * 0.02);
  }

  showPayConfirmationDialog(header, message, buttons) {
    this.alertController.create({
      header: header,
      message: message,
      buttons: buttons,
    }).then(res => {
      res.present();
    })
  }

  viewInvoice(index: number) {
    for (let i = 0; i < this.individualInvoices.length; i++) {
      if (i == index) {
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
          invoice_type: 'you',
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
    if (this.allInvoices[i].showOptions) {
      this.allInvoices[i].showOptions = false;
      return;
    }
    this.allInvoices[i].showOptions = true;
    //this.showOptions = !this.showOptions;
  }

  checkAndPayCustomer(index: number) {
    const formData = new FormData();
    formData.append('email', this.individualInvoices[index].from_email);
    this.basicServices.showLoding('Checking User As A Customer...');
    this.checkCustomerServices.checkCustomerRequest(formData).then(data => {
      console.log(data);
      if (data) {
        this.isCustomer = data.is_customer;
        if (!this.isCustomer) {
          this.showCustomerNotAddedMessage(index);
        } else {
          //this.navigateToSelectPayment(index);
          this.payUser(index);
        }
      }
      this.basicServices.hideLoading();
    })
  }

  navigateToSelectPayment(index: number) {
    for (let i = 0; i < this.individualInvoices.length; i++) {
      if (i == index) {
        // const invoice = {
        //   amount: this.individualInvoices[i].amount,
        // }

        let navigationExtras: NavigationExtras = {
          queryParams: {
            amount: this.individualInvoices[i].amount,
            paymentFrom: 'invoice',
          }
        }

        this.router.navigate(['/select-payment'], navigationExtras);
      }
    }
  }

  showPay(i: number) {
    const invoices = this.allInvoices.map((item: any, index: any) => {
      if (index === i) {
        return item;
      }

      return {
        ...item,
        pay: true
      }
    })
    this.allInvoices = invoices;
    if (this.allInvoices[i].pay) {
      this.allInvoices[i].pay = false;
      return;
    }
    this.allInvoices[i].pay = true;
  }

  showCustomerNotAddedMessage(index: number) {
    const buttons = [
      {
        text: 'Cancel'
      },
      {
        text: 'Proceed',
        handler: () => {
          this.goToAddCustomer(index);
        }
      }
    ]
    this.alertController.create({
      header: 'Not A Customer',
      message: 'This user is not added as a customer. Do you want add this user as a customer?',
      buttons: buttons
    }).then(res => {
      res.present();
    })
  }

  goToAddCustomer(index: number) {
    const customer = {
      id: this.individualInvoices[index].id,
      amount: this.individualInvoices[index].amount,
      invoice_date: this.individualInvoices[index].invoice_date,
      invoice_number: this.individualInvoices[index].invoice_number,
      from_name: this.individualInvoices[index].from_name,
      from_email: this.individualInvoices[index].from_email,
      to_name: this.individualInvoices[index].to_name,
      to_email: this.individualInvoices[index].to_email,
    }

    let navigationExtras: NavigationExtras = {
      queryParams: {
        customerParams: JSON.stringify(customer),
      }
    }
    this.router.navigate(['add-customer'], navigationExtras);
  }

}
