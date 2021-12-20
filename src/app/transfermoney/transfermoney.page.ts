import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSelect } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../auth.service';
import { BasicService } from '../../services/basic.service';
import { TransferMoney } from '../../services/transfermoney.service';
import { BankListModalComponent } from './../bank-list-modal/bank-list-modal.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-transfermoney',
  templateUrl: './transfermoney.page.html',
  styleUrls: ['./transfermoney.page.scss'],
})
export class TransfermoneyPage implements OnInit {


  constructor(private router: Router, private location: Location,
    private transferMoneyService: TransferMoney,
    private authService: AuthService,
    private basicService: BasicService,
    public modalController: ModalController) { }

  availableBalance: any = null;
  allCustomers: any[] = [];
  selectedAmount: any = null;
  selectedTransferAmount: any = null;
  //router: Router;
  ngOnInit() {
    this.balanceCheck();
    this.getAllCustomers();
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

  transferingFund(customer: any): any {
    if (this.selectedTransferAmount && this.selectedTransferAmount > 0) {
      this.basicService.showLoding('Transfering Fund');
      const data = {
        amount: this.selectedTransferAmount,
        id: customer.id
      };
      this.transferMoneyService.tranferingFund(data).then(data => {
        this.balanceCheck();
        this.authService.Toast('Succefull Transferd');
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

  goBack(): any {
    this.location.back();
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