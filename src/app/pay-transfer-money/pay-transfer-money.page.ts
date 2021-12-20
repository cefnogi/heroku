import { GetWalletServices } from './../../services/get-wallet';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BasicService } from '../../services/basic.service';
import { TransferMoney } from '../../services/transfermoney.service';
import { BankListModalComponent } from './../bank-list-modal/bank-list-modal.component';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pay-transfer-money',
  templateUrl: './pay-transfer-money.page.html',
  styleUrls: ['./pay-transfer-money.page.scss'],
})
export class PayTransferMoneyPage implements OnInit {

  constructor(private router: Router, private location: Location,
    private transferMoneyService: TransferMoney,
    private authService: AuthService,
    private basicService: BasicService,
    private walletService: GetWalletServices,
    private alertController: AlertController,
    public modalController: ModalController) { }

  availableBalance: any = null;
  allCustomers: any[] = [];
  selectedAmount: any = null;
  selectedTransferAmount: any = null;
  totalTransferAmount: any = {};
  availableBalanceInDollars: any = {};

  ngOnInit() {
    //this.balanceCheck();
    this.getWalletBalance();
    this.getAllCustomersNew();
  }

  goBack(): any {
    this.location.back();
  }

  balanceCheck(): any {
    this.transferMoneyService.getBalanceCheck().then(data => {
      if (data && data.response && data.response.available) {
        this.availableBalance = data.response.available[0].amount
      }
    }).catch(e => {
      this.authService.Toast(e.message);
    })
  }

  getWalletBalance() {
    const formData = new FormData();
    formData.append('user_id', localStorage.getItem('user_id'))
    this.walletService.getWallet(formData).then(data => {
      console.log(data);
      if (data && data.response) {
        if (data.response.hasOwnProperty('error')) {
          throw data.response.error;
        } else {
          const amountInCents = parseInt(data.response['amount'])
          const amountInDollars =  amountInCents/100;
          this.availableBalance = amountInDollars.toString();
        }
      }
    })
  }

  getAllCustomers(): any {
    this.basicService.showLoding();
    this.transferMoneyService.getAllCustomers().then(data => {
      if (data && data.response && data.response.data) {
        this.allCustomers = data.response.data;
        console.log(this.allCustomers);
      }
    }).catch(e => {
      this.authService.Toast(e.message);
    }).finally(() => {
      this.basicService.hideLoading();
    })
  }

  getAllCustomersNew(): any {
    this.basicService.showLoding();
    this.transferMoneyService.getAllCustomers().then(data => {
      console.log(data);
      if (data && data.response && data.response) {
        this.allCustomers = data.response;
        console.log(this.allCustomers);
      }
    }).catch(e => {
      this.authService.Toast(e.message);
    }).finally(() => {
      this.basicService.hideLoading();
    })
  }

  transferingFund(customer: any): any {
    if (this.selectedTransferAmount && this.selectedTransferAmount > 0) {
      this.basicService.showLoding('Transfering Fund');
      this.totalTransferAmount = this.selectedTransferAmount + (this.selectedTransferAmount * 0.02);
      const amountInCents = parseFloat(this.totalTransferAmount) * 100.0
      const data = {
        amount: amountInCents.toString(),
        id: customer.id,
        user_id: localStorage.getItem('user_id'),
      };
      this.transferMoneyService.tranferingFund(data).then(data => {
        this.getWalletBalance();
        if (this.availableBalance && this.availableBalance >= this.selectedTransferAmount) {
          this.authService.Toast('Successfully Transferd');
        } else {
          this.authService.Toast("No sufficient balance");
        }
      }).catch(e => {
        this.authService.Toast(e.message);
      }).finally(() => {
        this.basicService.hideLoading();
      });
    }
  }

  addingFund(): any {
    if (this.selectedAmount && this.selectedAmount > 0) {
      this.basicService.showLoding('Adding Fund');
      const data = {
        amount: this.selectedAmount
      }
      this.transferMoneyService.addingFund(data).then(data => {
        this.balanceCheck();
        this.selectedAmount = null;
      }).catch(e => {
        this.authService.Toast(e.message);
      }).finally(() => {
        this.basicService.hideLoading();
      })
    }
  }

  transferMoney(i: number, customer = null): any {
    const newAllCustomers = this.allCustomers.map((item: any, index: any) => {
      if (index === i) {
        return item;
      }
      return {
        ...item,
        edit: false
      };
    });
    this.allCustomers = newAllCustomers;
    this.selectedTransferAmount = null;
    if (this.allCustomers[i].edit) {
      this.allCustomers[i].edit = false;
      return;
    }
    this.allCustomers[i].edit = true;
  }  

  payingOutFund(): any {
    if (this.selectedAmount && this.selectedAmount > 0) {
      this.basicService.showLoding('PayingOut Fund');
      const data = {
        amount: this.selectedAmount
      }
      this.transferMoneyService.payingOutFund(data).then(data => {
        this.balanceCheck();
        this.selectedAmount = null;
      }).catch(e => {
        this.authService.Toast(e.message);
      }).finally(() => {
        this.basicService.hideLoading();
      })
    }
  }  

  selectPayment(): any {
    if (this.selectedAmount && this.selectedAmount > 0) {
      const data = {
        amount: this.selectedAmount
      }
      this.balanceCheck();
      if (this.availableBalance && this.availableBalance >= this.selectedAmount) {
        const navigationExtras: NavigationExtras = {
          queryParams: {
            amount: this.selectedAmount
          }
        }
        this.router.navigate(['/select-payment'], navigationExtras);
      } else {
        this.authService.Toast("No sufficient balance");
      }
    }
  }  

  // Show Bank List
  async showBankList() {
    const modal = await this.modalController.create({
      component: BankListModalComponent
    });
    return await modal.present();
  }  

  confirmPayout(customer: any) {
    this.calculateTotalTransferAmount();
    if (this.totalTransferAmount && this.totalTransferAmount > 0) {
      const confirmationMessage = "Do you want to pay this customer? " +
      "An extra 2% of the transfer amount " + 
      "would be levied as fees from your wallet account." + 
      "Hence the total amount will be $" + this.totalTransferAmount;
      const confirmationButtons = [
        {
          text: 'Yes',
          handler: () => {
            this.transferingFund(customer);
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

  showInsufficientBalanceMessage() {
    const message = `You have $ ${this.availableBalance} which is insufficent to make a transaction. Please make sure that you have sufficient balance`;
    const buttons = [
      {
        text: 'OK',
      }
    ];
    this.showPayConfirmationDialog('Insufficient Balance', message, buttons);
  }

  calculateTotalTransferAmount() {
    this.totalTransferAmount = this.selectedTransferAmount + (this.selectedTransferAmount * 0.02);
  }

  calculateAvailableBalance() {
    this.availableBalanceInDollars = parseFloat(this.availableBalance) / 100.0;
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

  goHome(): any {
    this.router.navigateByUrl('/home', {
      replaceUrl: true,
    });
  }
}
