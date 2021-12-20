import { GetPlaidAuthServices } from './../../services/plaid-auth-service';
import { GetWalletServices } from './../../services/get-wallet';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BasicService } from '../../services/basic.service';
import { TransferMoney } from '../../services/transfermoney.service';
// import { BankListModalComponent } from './../bank-list-modal/bank-list-modal.component';
import { BankListModalComponent } from './../components/bank-list-modal/bank-list-modal.component';
import { BankListPage } from '../bank-list/bank-list.page';
import { ModalController } from '@ionic/angular';
declare var Plaid;

@Component({
  selector: 'app-my-linked-accounts',
  templateUrl: './my-linked-accounts.page.html',
  styleUrls: ['./my-linked-accounts.page.scss'],
})
export class MyLinkedAccountsPage implements OnInit {

  constructor(private router: Router, private location: Location,
    private transferMoneyService: TransferMoney,
    private authService: AuthService,
    private basicService: BasicService,
    private walletService: GetWalletServices,
    private getPlaidAuthService: GetPlaidAuthServices,
    public modalController: ModalController) { }

  availableBalance: any = null;
  allCustomers: any[] = [];
  selectedAmount: any = null;
  selectedTransferAmount: any = null;
  plaidAuthData: any = {};
  plaidHandler: any;

  ngOnInit() {
    //this.balanceCheck();
    this.getWalletBalance();
    this.getAllCustomers();
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
          amount: this.selectedAmount
        }
      }
      this.router.navigate(['/select-payment'], navigationExtras);
    }
  }  

  navigateToBankList() {
    this.router.navigateByUrl('/bank-list');
  }

  linkToPlaid() {
    const formData = new FormData();
    formData.append('client_name', localStorage.getItem('user_name'));
    formData.append('country_codes', 'US');
    formData.append('client_user_id', localStorage.getItem('user_id'));
    this.basicService.showLoding('Getting Banks List...');
    this.getPlaidAuthService.getPlaidAuthRequest(formData).then(data => {
      console.log(data)
      if (data) {
        this.plaidAuthData = {
          expiration: data.expiration,
          link_token: data.link_token,
          request_id: data.request_id
        }
        this.navigateToPlaidPage();
      }
    }).catch(e => {
      this.authService.Toast(e.message);
    }).finally(() => {
      this.basicService.hideLoading();
    })
  }

  navigateToPlaidPage() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        link_token: this.plaidAuthData.link_token,
      }
    }

    this.router.navigate(['/plaid'], navigationExtras);
  }

  configurePlaid() {
    this.plaidHandler = Plaid.create({
      token: this.plaidAuthData.link_token,
      onSuccess: (public_token, metadata) => {
        console.log(`Public Token ${public_token}`);
        console.log(`Metadata ${metadata}`);
      },
      onLoad: () => {
        console.log(`onLoad() Called`);
      },
      onExit: (err, metadata) => {
        console.log(`onExit() Called`);
        console.log(`onExit() error: ${err}`);
        console.log(`onExit() metdata: ${metadata}`);
      },
      onEvent: (eventName, metadata) => {
        console.log(`onEvent() Called ${eventName}`);
        console.log(`onEvent() Metadata ${metadata}`);
      },
      receivedRedirectUri: null,
    })
    console.log(`Plaid Handler: ${JSON.stringify(this.plaidHandler)}`);
  }

  onPlaidSuccess(event: any){
    console.log(`onPlaidSuccess Called`);
  }

  onPlaidExit(event: any){
    console.log(`onPlaidExit Called`);
  }

  onPlaidLoad(event: any){
    console.log(`onPlaidLoad Called`);
  }

  onPlaidClick(event: any) {
    console.log(`onPlaidClick Called`);
  }

}
