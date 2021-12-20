import { GetPlaidAccountServices } from './../../services/plaid-account-service';
import { GetPlaidTokenServices } from './../../services/plaid-token-service';
import { AuthService } from './../auth.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { BasicService } from 'src/services/basic.service';
import {
  PlaidErrorMetadata,
  PlaidErrorObject,
  PlaidEventMetadata,
  PlaidOnEventArgs,
  PlaidOnExitArgs,
  PlaidOnSuccessArgs,
  PlaidSuccessMetadata,
  PlaidConfig,
  NgxPlaidLinkService,
  PlaidLinkHandler
} from "ngx-plaid-link";
import { GetStripeServices } from 'src/services/stripe-service';

declare var Plaid;

@Component({
  selector: 'app-plaid',
  templateUrl: './plaid.page.html',
  styleUrls: ['./plaid.page.scss'],
})
export class PlaidPage implements OnInit {
  
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private plaidTokenService: GetPlaidTokenServices,
    private plaidAccountService: GetPlaidAccountServices,
    private basicService: BasicService,
    private authService: AuthService,
    private plaidLinkService: NgxPlaidLinkService,
    private stripeService: GetStripeServices,
  ) { 
    this.route.queryParams.subscribe(params => {
      //console.log(params);
      this.linkToken = params.link_token;
    })
  }
  plaidHandler: any = {};
  plaidAuthData: any = {};
  linkToken: string = '';
  config: PlaidConfig;
  plaidLinkHandler: PlaidLinkHandler;
  allAccounts: any[] = [];
  accessToken: string = '';
  stripeBankAccountToken: string = '';
  accountId: string = '';
  accountName: string = '';
  accountOfficialName: string = '';
  bankAccountId: string = '';

  goBack(): any {
    this.location.back();
  }

  initPlaidConfig() {
    this.config = {
      apiVersion: "v2",
      env: "sandbox",
      selectAccount: false,
      token: this.linkToken,
      webhook: "",
      product: ["auth"],
      countryCodes: ['US', 'CA', 'GB'],
      key: environment.plaid_public_key_new,
      onSuccess: () => {
        console.log(`onSuccess Called`)
      },
      onExit: () => {
        console.log(`onExit Called`)
      }
    };
  }


  ngOnInit() {
    // this.configurePlaid();
    this.initPlaidConfig();
  }

  ngAfterViewInit(): void {
    console.log(this.linkToken);
    this.plaidLinkService.createPlaid(
      Object.assign({}, this.config, {
        onSuccess: (public_token, metadata) => {
          this.onSuccess(public_token, metadata);
        },
        onExit: (error, metadata) => {
          this.onExit(error, metadata);
        },
        onEvent: (eventName, metadata) => {
          this.onEvent(eventName, metadata);
        }
      })
    ).then((handler: PlaidLinkHandler) => {
      this.plaidLinkHandler = handler
      this.open();
    })
  }


  open() {
    this.plaidLinkHandler.open();
  }

  exit() {
    this.plaidLinkHandler.exit();
  }

  onSuccess(public_token, metadata) {
    console.log(`onSuccess Called.`);
    console.log(`Public Token ${public_token}`);
    console.log(`Metadata ${JSON.stringify(metadata)}`);
    this.getPlaidToken(public_token);
  }

  onExit(error, metadata) {
    console.log(`On Exit Called.`);
    console.log(`Error: ${error}`);
    console.log(`Metadata: ${JSON.stringify(metadata)}`);
  }

  onEvent(eventName, metadata) {
    console.log(`onEvent Called`);
    console.log(`Event Name: ${eventName}`);
    console.log(`Metadata: ${JSON.stringify(metadata)}`);
  }

  getPlaidToken(public_token: string) {
    const formData = new FormData();
    formData.append('public_token', public_token);
    this.basicService.showLoding('Gathering Details...');
    this.plaidTokenService.getPlaidTokenRequest(formData).then(data => {
      if (data) {
        console.log(data);
        this.accessToken = data.access_token
        console.log(this.accessToken)
        this.getAccountId(this.accessToken);
      }
    }).catch( e => {
      this.authService.Toast(e.message);
    }).finally(() => {
      this.basicService.hideLoading();
    })
  }

  getAccountId(access_token: string) {
    const formData = new FormData();
    formData.append('access_token', access_token);
    this.basicService.showLoding('Getting Account...');
    this.plaidAccountService.getPlaidAccountIdRequest(formData).then(data => {
      if (data && data.accounts) {
        console.log(data)
        this.allAccounts = data.accounts;
      }
    }).catch( e => {
      this.authService.Toast(e.message);
    }).finally(() => {
      this.basicService.hideLoading();
    })
  }

  showConnectButton(i: number) {
    const accounts = this.allAccounts.map((item: any, index: any) => {
      if (index === i) {
        return item;
      }
      return {
        ...item,
        showConnectButton: false,
      }
    })
    this.allAccounts = accounts;
    if (this.allAccounts[i].showConnectButton) {
      this.allAccounts[i].showConnectButton = false;
      return;
    }
    this.allAccounts[i].showConnectButton = true;
  }

  connectAccount(index: number) {
    for (let i = 0; i < this.allAccounts.length; i++) {
      if (i == index) {
        this.createBankAccountToken(this.allAccounts[i].account_id);
        this.accountId = this.allAccounts[i].account_id;
        this.accountName = this.allAccounts[i].name;
        this.accountOfficialName = this.allAccounts[i].official_name;
        //localStorage.setItem('account_name', this.accountName);
      }
    }
  }

  createBankAccountToken(account_id: string){
    const formData = new FormData();
    formData.append('account_id', account_id);
    formData.append('access_token', this.accessToken);
    this.basicService.showLoding('Connecting Bank Account...');
    this.plaidAccountService.getPlaidBankAccountTokenRequest(formData).then(data => {
      console.log(data);
      this.stripeBankAccountToken = data.stripe_bank_account_token;
      //this.navigateToSelectPayment();
      this.createCustomer(this.stripeBankAccountToken);
    }).catch(e => {
      this.authService.Toast(e.message);      
    }).finally(() => {
      this.basicService.hideLoading();
    })
  }

  createCustomer(token: string) {
    const formData = new FormData();
    formData.append('description', 'Customer Creation for Bank Account Connection');
    formData.append('source', token);
    this.basicService.showLoding('Creating Customer...');
    this.stripeService.getACHCustomerRequest(formData).then(data => {
      console.log(data);
      if (data && data.response) {
        const customer_id = data.response.id;
        localStorage.setItem('customer_id', customer_id);
        this.getACHCustomerBankAccount(this.stripeBankAccountToken, customer_id);
      }
    }).catch(e => {
      this.authService.Toast(e.message)
    }).finally(() => {
      this.basicService.hideLoading();
    })
  }

  getACHCustomerBankAccount(bank_token, customer_id) {
    const formData = new FormData();
    formData.append('bank_token_id', bank_token);
    formData.append('customer_id', customer_id);
    formData.append('connected_bank_name', this.accountName);
    formData.append('user_id', localStorage.getItem('user_id'));
    this.stripeService.getACHCustomerBankAccount(formData).then(data => {
      console.log(data);

      if(data && data.result) {
        this.bankAccountId = data.result.id;
        localStorage.setItem('bank_account_id', this.bankAccountId);
        this.goBack();
      }
    })
  }

  navigateToSelectPayment() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        user_id: localStorage.getItem('user_id'),
        account_id: this.accountId,
        account_name: this.accountName,
        account_official_name: this.accountOfficialName,
        stripe_bank_account: this.stripeBankAccountToken,
        paymentFrom: 'connect_account',
      }
    };
    this.router.navigate(['/select-payment'], navigationExtras);
  }

}
