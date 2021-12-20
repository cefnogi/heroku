import { ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GetWalletServices } from './../../services/get-wallet';
import { CheckCustomerServices } from './../../services/check-customer-service';
import { Routes, Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../auth.service';
import { BasicService } from '../../services/basic.service';
import { TransferMoney } from '../../services/transfermoney.service';
import { AlertController, Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { GetPaymentRequestServices } from 'src/services/get-payment-request';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-single-invoice',
  templateUrl: './single-invoice.page.html',
  styleUrls: ['./single-invoice.page.scss'],
})
export class SingleInvoicePage implements OnInit {
  invoice_amount: string = '';
  invoice: any = {};
  invoice_id: string = '';
  invoice_date: string = '';
  invoice_due_date: string = '';
  invoice_from_name: string = '';
  invoice_from_email: string = '';
  invoice_to_name: string = '';
  invoice_to_email: string = '';
  invoice_created_at: string = '';
  invoice_updated_at: string = '';
  address: string = '';
  purpose: string = '';
  invoiceType: string = 'you';
  totalTransferAmount: any = {};
  availableBalance: any = null;
  isCustomer: boolean = false;

  constructor(private location: Location, 
    private route: ActivatedRoute,
    private alertController: AlertController,
    private authService: AuthService,
    private basicServices: BasicService,
    private walletService: GetWalletServices,
    private transferMoneyService: TransferMoney,
    private router: Router,
    private checkCustomerServices: CheckCustomerServices,
    ) { 
    this.route.queryParams.subscribe(params => {
      console.log(params);
      if ( params && params.invoiceParams){
        this.invoice = JSON.parse(params.invoiceParams)
        console.log(this.invoice)
      }
    })
  }

  ngOnInit() {
    this.initInvoiceParams();
    this.getWalletBalance();
  }

  initInvoiceParams() {
    this.invoice_id = this.invoice.id;
    this.invoice_amount = this.invoice.amount;
    console.log(this.invoice.amount)
    this.invoice_date = this.invoice.invoice_date;
    this.invoice_due_date = this.invoice.invoice_due_date;
    this.invoice_from_name = this.invoice.from_name;
    this.invoice_from_email= this.invoice.from_email;
    this.invoice_to_name = this.invoice.to_name;
    this.invoice_to_email = this.invoice.to_email;
    this.invoice_created_at = this.invoice.created_at;
    this.invoice_updated_at = this.invoice.updated_at;
    this.invoiceType = this.invoice.invoice_type;
    this.address = this.invoice.address;
    this.purpose = this.invoice.purpose;
  }

  goBack(): any {
    this.location.back();
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

  checkAndPayCustomer() {
    const formData = new FormData();
    formData.append('email', this.invoice_from_email);
    this.basicServices.showLoding('Checking User As A Customer...');
    this.checkCustomerServices.checkCustomerRequest(formData).then(data => {
      console.log(data);
      if (data) {
        this.isCustomer = data.is_customer;
        if (!this.isCustomer) {
          this.showCustomerNotAddedMessage();
        } else {
          //this.navigateToSelectPayment(index);
          this.confirmPayout(this.invoice_amount);
        }
      }
      this.basicServices.hideLoading();
    })
  }

  showCustomerNotAddedMessage() {
    const buttons = [
      {
        text: 'Cancel'
      },
      {
        text: 'Proceed',
        handler: () => {
          this.goToAddCustomer();
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

  goToAddCustomer() {
    const customer = {
      id: this.invoice_id,
      amount: this.invoice_amount,
      invoice_date: this.invoice_date,
      from_name: this.invoice_from_name,
      from_email: this.invoice_from_email,
      to_name: this.invoice_to_name,
      to_email: this.invoice_to_email,
    }

    let navigationExtras: NavigationExtras = {
      queryParams: {
        customerParams: JSON.stringify(customer),
      }
    }
    this.router.navigate(['add-customer'], navigationExtras);
  }

  confirmPayout(invoice_amount: string) {
    this.calculateTotalTransferAmount(parseInt(invoice_amount));
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
            this.transferingFund(invoice_amount);
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

  transferingFund(invoice_amount: string): any {
    const amount = parseInt(invoice_amount)
    
    if (amount && amount > 0) {
      this.basicServices.showLoding('Paying Amount...');
      this.totalTransferAmount = amount + (amount * 0.02);
      const amountInCents = parseFloat(this.totalTransferAmount) * 100.0
      const data = {
        amount: amountInCents.toString(),
        id: this.invoice_id,
        user_id: localStorage.getItem('user_id'),
      };
      this.transferMoneyService.tranferingFund(data).then(data => {
        console.log(`this.availableBalance: ${this.availableBalance}`)
        if (this.availableBalance && parseFloat(this.availableBalance) >= parseInt(invoice_amount)) {
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

}
