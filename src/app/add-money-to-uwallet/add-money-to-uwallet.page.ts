import { GetWalletServices } from './../../services/get-wallet';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BasicService } from '../../services/basic.service';
import { TransferMoney } from '../../services/transfermoney.service';
import { BankListModalComponent } from './../bank-list-modal/bank-list-modal.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-money-to-uwallet',
  templateUrl: './add-money-to-uwallet.page.html',
  styleUrls: ['./add-money-to-uwallet.page.scss'],
})
export class AddMoneyToUwalletPage implements OnInit {

  constructor(private router: Router, private location: Location,
    private transferMoneyService: TransferMoney,
    private authService: AuthService,
    private basicService: BasicService,
    private walletService: GetWalletServices,
    public modalController: ModalController) { }

    availableBalance: any = null;
    allCustomers: any[] = [];
    selectedAmount: any ;
    selectedTransferAmount: any = null;
    paymentFrom: string = null;

  ngOnInit() {
    //this.balanceCheck();
    
  }

  ionViewWillEnter(){
    this.getWalletBalance();
    //this.getAllCustomers();
  }

  goBack(): any {
    this.location.back();
  }

  goHome(): any {
    this.router.navigateByUrl('/home', {
      replaceUrl: true,
    });
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
    this.basicService.showLoding();
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
    }).catch(e => {
      this.authService.Toast(e.message);
    }).finally(() => {
      this.basicService.hideLoading();
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

  // Show Bank List
  async showBankList() {
    const modal = await this.modalController.create({
      component: BankListModalComponent
    });
    return await modal.present();
  }  


  selectPayment(): any {
    if (this.selectedAmount && this.selectedAmount > 0) {
      const data = {
        amount: this.selectedAmount
      }
      const navigationExtras: NavigationExtras = {
        queryParams: {
          amount: this.selectedAmount,
          paymentFrom: 'wallet',
        }
      }
      this.router.navigate(['/select-payment'], navigationExtras);
    }
  }  

}
