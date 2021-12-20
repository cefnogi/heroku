import { GetWalletServices } from './../../services/get-wallet';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BasicService } from '../../services/basic.service';
import { TransferMoney } from '../../services/transfermoney.service';
import { BankListModalComponent } from './../bank-list-modal/bank-list-modal.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pay-employees-and-services',
  templateUrl: './pay-employees-and-services.page.html',
  styleUrls: ['./pay-employees-and-services.page.scss'],
})
export class PayEmployeesAndServicesPage implements OnInit {

  constructor(private router: Router, private location: Location,
    private transferMoneyService: TransferMoney,
    private authService: AuthService,
    private basicService: BasicService,
    private walletService: GetWalletServices,
    public modalController: ModalController) { }


  availableBalance: any = null;
  allCustomers: any[] = [];
  selectedAmount: any = null;
  selectedTransferAmount: any = null;

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
      const amountInDollars = parseInt(this.selectedTransferAmount) * 100

      const data = {
        amount: amountInDollars.toString(),
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
}
