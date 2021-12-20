import { GetWalletServices } from './../../services/get-wallet';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BasicService } from '../../services/basic.service';
import { TransferMoney } from '../../services/transfermoney.service';
import { BankListModalComponent } from './../bank-list-modal/bank-list-modal.component';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-transfer-to-bank-account',
  templateUrl: './transfer-to-bank-account.page.html',
  styleUrls: ['./transfer-to-bank-account.page.scss'],
})
export class TransferToBankAccountPage implements OnInit {

  constructor(private router: Router, private location: Location,
    private transferMoneyService: TransferMoney,
    private authService: AuthService,
    private basicService: BasicService,
    private alertController: AlertController,
    private walletService: GetWalletServices,
    public modalController: ModalController) { }

  availableBalance: any = null;
  allCustomers: any[] = [];
  selectedAmount: any = null;
  selectedTransferAmount: any = null;
  totalTransferAmount: any = null;

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
      if (data && data.response) {
        console.log(data);
        this.allCustomers = data.response;
      }
    }).catch(e => {
      this.authService.Toast(e.message);
    }).finally(() => {
      this.basicService.hideLoading();
    })
  }

  calculateTotalTransferAmount() {
    this.totalTransferAmount = this.selectedTransferAmount + (this.selectedTransferAmount * 0.02);
  }

  transferingFund(customer: any): any {
    if (this.selectedTransferAmount && this.selectedTransferAmount > 0) {
      this.basicService.showLoding('Paying Fund...');
      this.totalTransferAmount = this.selectedTransferAmount + (this.selectedTransferAmount * 0.02);
      console.log(`Total Transfer Amount: ${this.totalTransferAmount}`)
      const amountInCents = parseFloat(this.totalTransferAmount) * 100.0
      console.log(`Total Transfer Amount: ${amountInCents}`);
      const data = {
        amount: amountInCents.toString(),
        id: customer.id,
        user_id: localStorage.getItem('user_id'),
      };
      // console.log(this.selectedTransferAmount * 0.02);
      // console.log(this.totalTransferAmount);
      // console.log(`Data Amount: ${data.amount}`);
      this.transferMoneyService.tranferingFund(data).then(data => {
        console.log(`Data: ${JSON.stringify(data)}`);
        this.getWalletBalance();
        if (this.availableBalance && this.availableBalance >= this.totalTransferAmount) {
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

  showPayConfirmationDialog(header, message, buttons) {
    this.alertController.create({
      header: header,
      message: message,
      buttons: buttons,
    }).then(res => {
      res.present();
    })
  }

  confirmPayout(customer: any) {
    if (this.selectedTransferAmount && this.selectedTransferAmount > 0) {
      this.calculateTotalTransferAmount();
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
}
