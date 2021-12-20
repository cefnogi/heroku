import { GetStripeServices } from 'src/services/stripe-service';
import { Component, OnInit } from '@angular/core';
import { GetPlaidAuthServices } from './../../services/plaid-auth-service';
//import { Stripe } from '@ionic-native/stripe/ngx';
declare var Stripe;
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http'
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { environment } from '../../environments/environment';
import { AlertController } from '@ionic/angular';
import { BasicService } from 'src/services/basic.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-select-payment',
  templateUrl: './select-payment.page.html',
  styleUrls: ['./select-payment.page.scss'],
})
export class SelectPaymentPage implements OnInit {
  stripe_key: string = environment.stripe_publishable_key;
  Stripe = new Stripe(this.stripe_key);
  card: any;
  paymentAmount: string = '3.33';
  paymentAmountInCents: number = 0.00;
  currency: string = 'usd';
  currencyIcon: string = '$';
  description: '';
  cardDetails: any = {};
  hideCreditDebitCard: boolean = true;
  hideNetBanking: boolean = true;
  createChargeUrl: string = environment.baseApi + '/' + 'create-charge';
  verifyBankAccountUrl: string = environment.baseApi + '/' + 'verify-bank-account';
  createSourceUrl: string = environment.baseApi + '/' + 'create-source';
  customerAssociateUrl: string = environment.baseApi + '/' + 'customer-associate';
  creditChargeUrl: string = environment.baseApi + '/' + 'credit-charge';
  createCreditCardChargeUrl: string = environment.baseApi + '/' + 'create-credit-card-charge';
  achCustomerUrl: string = environment.baseApi + '/' + 'ach-customer';
  achMiniDepositUrl: string = environment.baseApi + '/' + 'ach-mini-deposit'
  achChargeUrl: string = environment.baseApi + '/' + 'ach-charge';
  headers: any = {
    Authorization: 'Bearer ' + localStorage.getItem('token') || ''
  };

  account_name: string = '';
  account_number: string = '';
  routing_number: string = '';
  account_type: string = '';
  paymentFrom: string = '';
  plaidAuthData: any = {};
  netBanking: any ={};

  connectedAccounts: any[] = [];

  constructor(private route: ActivatedRoute,
    private location: Location,
    private http: HttpClient,
    private alertController: AlertController,
    private basicService: BasicService,
    private inAppBrowser: InAppBrowser,
    private getPlaidAuthService: GetPlaidAuthServices,
    private authService: AuthService,
    private stripeService: GetStripeServices,
    private router: Router,
  ) { 
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.paymentAmount = params.amount;
      this.paymentFrom = params.paymentFrom;
    })
  }

  ngOnInit() {
    this.setupStripe();
  }

  goBack(): any {
    this.location.back();
  }

  goHome() {
    this.router.navigateByUrl('/home', {
      replaceUrl: true,
    })
  }

  ionViewWillEnter(){
    if (this.netBanking.checked) {
      this.selectNetBanking();
      this.populateBankAccounts();
    }
  }

  selectNetBanking() {
    this.showNetBanking();
    this.netBanking.checked;
  }

  navigateToAddMoneyToUWallet() {
    this.router.navigate(['add-money-to-uwallet']);
  }

  populateBankAccounts() {
    const bank_account_id = localStorage.getItem('bank_account_id');
    const user_id = localStorage.getItem('user_id');
    const customer_id = localStorage.getItem('customer_id');
    console.log(customer_id);
    const formData = new FormData();
    formData.append('user_id', user_id);
    formData.append('customer_id', customer_id);
    this.basicService.showLoding('Fetching Bank Accounts...');

    this.stripeService.getBankAccounts(formData).then(data => {
      console.log(data);
    }).catch(e => {
      this.authService.Toast(e.message);
    }).finally(() => {
      this.basicService.hideLoading();
    })

  }



  showCreditDebitCard() {
    this.hideCreditDebitCard = false;
    this.hideNetBanking = true;
  }

  showNetBanking() {
    this.hideCreditDebitCard = true;
    this.hideNetBanking = false;
  }

  setupStripe(): void {
    let elements = this.Stripe.elements();
    var style = {
      base: {
        color: '#32325d',
        //lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };
    this.card = elements.create('card', { style: style });
    
    console.log(this.card);
    this.card.mount('#card-element');

    this.card.addEventListener('change', event => {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    var form = document.getElementById('stripe-form');
    form.addEventListener('submit', event => {
      event.preventDefault();
      console.log(event)
      if (this.paymentFrom === 'invoice'){
        this.basicService.showLoding('Paying Invoice...');
      } else if (this.paymentFrom == 'wallet') {
        this.basicService.showLoding('Adding Balance...');
      } else if (this.paymentFrom == 'connect_account') {
        this.basicService.showLoding('Connecting Account...');
        this.showNetBanking();
        this.netBanking.checked = true;
      }

      this.Stripe.createSource(this.card).then(result => {
        if (result.error) {
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
          this.basicService.hideLoading();
        } else {
          console.log(result);
          this.paymentAmountInCents = Number(this.paymentAmount) * 100.0;
          //this.makePayment(result);
          //this.makePaymentUsingSource(result);
          this.makePaymentUsingCreditCard(result);
        }
      });

      /*
      this.Stripe.createToken(this.card).then(result => {
        if (result.error) {
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
          this.basicService.hideLoading();
        } else {
          console.log(result);
          this.paymentAmountInCents = Number(this.paymentAmount) * 100.0;
          this.makePaymentUsingToken(result);
        }
      })
      */
    });
  }


  makePayment(result) {
    console.log('Payment Amount In Cents: ' + this.paymentAmountInCents);
    console.log('Currency: ' + this.currency);
    console.log('Source: ' + result.source.id);
    this.http.post(this.createChargeUrl, {
      amount: this.paymentAmountInCents,
      currency: this.currency,
      source: result.source.id,
      description: this.description
    }).subscribe(data => {
      console.log(data);
      this.basicService.hideLoading();
      if (data['status'] === 'succeeded') {
        const receiptUrl = data['receipt_url'];
        const successMessage = 'An amount of ' + this.currencyIcon + this.paymentAmount + ' has been added successfully to your wallet';
        const successButtons = [
          {
            text: 'View Receipt',
            handler: () => {
              this.goToUrl(receiptUrl);
            }
          },
          {
            text: 'Close',
            handler: () => {
              this.navigateToAddMoneyToUWallet();
            }
          }
        ];
        this.showSuccessMessage('Balance Added To Your Wallet', successMessage, successButtons);
      } else if (data['error'].type === 'card_error') {
        const failureMessage = data['error'].message;
        const doc_url = data['error'].doc_url;
        const failureButtons = [
          {
            text: 'Visit Stripe',
            handler: () => {
              this.goToUrl(doc_url);
            }
          },
          {
            text: 'Close',
            handler: () => {
              this.goBack();
            }
          }
        ];
        this.showFailureMessage('Failed to Add Balance To Your Wallet', failureMessage, failureButtons);
      }
    });
  }

  makePaymentUsingCreditCard(result) {
    console.log('Payment Amount In Cents: ' + this.paymentAmountInCents);
    console.log('Currency: ' + this.currency);
    console.log('Source: ' + result.source.id);

    let params: any = {
      'amount': this.paymentAmountInCents,
      'currency': this.currency,
      'source' : result.source.id,
      'description': 'Credit / Debit Card Charge',
      'user_id': localStorage.getItem('user_id'),
    }

    let option: any = {
      headers: this.headers,
      params
    }
    this.http.post(this.createCreditCardChargeUrl, null, option).subscribe(data => {
      console.log(data);
      this.basicService.hideLoading();
      if (data['status'] === 'success' && data['response'] !== null && !(data['response'].error)) {
        const receiptUrl = data['response'].receipt_url;
        let successMessage = 'An amount of ' + this.currencyIcon + this.paymentAmount + ' has been added successfully to your wallet';
        if (this.paymentFrom === 'wallet') {
          successMessage = 'An amount of ' + this.currencyIcon + this.paymentAmount + ' has been added successfully to your wallet';
        } else if (this.paymentFrom === 'invoice'){
          successMessage = 'An amount of ' + this.currencyIcon + this.paymentAmount + ' has been successfully paid to the customer';
        }

        const successButtons = [
          {
            text: 'View Receipt',
            handler: () => {
              this.goToUrl(receiptUrl);
            }
          },
          {
            text: 'Close',
            handler: () => {
              console.log('Close Called');
              this.goBack();
              //this.navigateToAddMoneyToUWallet();
            }
          }
        ];
        let header = '';
        if (this.paymentFrom == 'wallet'){
          header = 'Balance Added To Your Wallet';
        }
        else if (this.paymentFrom == 'invoice') {
          header = 'Invoice Paid To Customer';
        }
        this.showSuccessMessage(header, successMessage, successButtons);        
      } else if(data['response'].error) {
        const failureMessage = data['response'].error.message;
        const failureButtons = [
          {
            text: 'Try Again',
          },
          {
            text: 'Close',
            handler: () => {
              this.goBack();
            }
          }
        ];
        this.showFailureMessage('Failed to Add Balance To Your Wallet', failureMessage, failureButtons);
      }
      /*
       else if (data['error'].type === 'card_error') {
        const failureMessage = data['error'].message;
        const doc_url = data['error'].doc_url;
        const failureButtons = [
          {
            text: 'Visit Stripe',
            handler: () => {
              this.goToUrl(doc_url);
            }
          },
          {
            text: 'Close',
            handler: () => {
              this.goBack();
            }
          }
        ];
        this.showFailureMessage('Failed to Add Balance To Your Wallet', failureMessage, failureButtons);
      }
      */
    });
  }

  makePaymentUsingSource(result) {
    console.log('Payment Amount In Cents: ' + this.paymentAmountInCents);
    console.log('Currency: ' + this.currency);
    console.log('Source: ' + result.source.id);

    let params: any = {
      'type': 'ach_credit_transfer',
      'owner[email]': 'test3.48@gmail.com',
      'currency': this.currency
    }

    let option: any = {
      headers: this.headers,
      params
    }

    this.http.post(this.createSourceUrl, null, option).subscribe(data => {
      console.log(data);
      //this.basicService.hideLoading();
      if (data['status'] == 'success') {
        const email = data['response'].owner.email;
        const source_id = data['response'].id;
        console.log('Customer Assc email: ' + email);
        console.log('Customer Assc source id : ' + source_id);
        params = {
          'email': email,
          'source': source_id,
        }

        option = {
          headers: this.headers,
          params,
        }
        this.http.post(this.customerAssociateUrl, null, option).subscribe(customerData => {
          console.log(customerData);
          //this.basicService.hideLoading();
          if (customerData['status'] == 'success') {
            const amount = this.paymentAmountInCents;
            const customer = customerData['response'].id;

            console.log('Create Charge Customer Id: ' + customer);
            params = {
              'amount': amount,
              'currency': this.currency,
              'customer': customer,
              'source': source_id
            }
            console.log(params);
            option = {
              headers: this.headers,
              params
            }

            this.http.post(this.creditChargeUrl, null, option).subscribe(createChargeData => {
              console.log(createChargeData);
              this.basicService.hideLoading();
              if (createChargeData['status'] == 'success') {
                const receiptUrl = data['response'].receipt_url;
                const successMessage = 'An amount of ' + this.currencyIcon + this.paymentAmount + ' has been added successfully to your wallet';
                const successButtons = [
                  {
                    text: 'View Receipt',
                    handler: () => {
                      this.goToUrl(receiptUrl);
                    }
                  },
                  {
                    text: 'Close',
                    handler: () => {
                      this.navigateToUWallet();
                    }
                  }
                ];
                this.showSuccessMessage('Balance Added To Your Wallet', successMessage, successButtons);
              } else if (data['error'].type === 'card_error') {
                const failureMessage = data['error'].message;
                const doc_url = data['error'].doc_url;
                const failureButtons = [
                  {
                    text: 'Visit Stripe',
                    handler: () => {
                      this.goToUrl(doc_url);
                    }
                  },
                  {
                    text: 'Close',
                    handler: () => {
                      this.goBack();
                    }
                  }
                ];
                this.showFailureMessage('Failed to Add Balance To Your Wallet', failureMessage, failureButtons);
              }
            })
          }
        });
      }
    });
  }

  navigateToMyLinkedAccounts() {
    this.router.navigateByUrl('/my-linked-accounts')
  }

  navigateToUWallet() {
    this.router.navigateByUrl('/add-money-to-uwallet');
  }

  makePaymentUsingToken(result) {
    console.log('Payment Amount In Cents: ' + this.paymentAmountInCents);
    console.log('Currency: ' + this.currency);
    console.log('Source: ' + result.token.id);
    this.http.post(this.verifyBankAccountUrl, {
      //amount: this.paymentAmountInCents,
      //currency: this.currency,
      source: result.token.id,
      description: this.description
    }).subscribe(data => {
      console.log(data);
      this.basicService.hideLoading();
      if (data['status'] === 'succeeded') {
        const receiptUrl = data['receipt_url'];
        const successMessage = 'An amount of ' + this.currencyIcon + this.paymentAmount + ' has been added successfully to your wallet';
        const successButtons = [
          {
            text: 'View Receipt',
            handler: () => {
              this.goToUrl(receiptUrl);
            }
          },
          {
            text: 'Close',
            handler: () => {
              this.goBack();
            }
          }
        ];
        this.showSuccessMessage('Balance Added To Your Wallet', successMessage, successButtons);
      } else if (data['error'].type === 'card_error') {
        const failureMessage = data['error'].message;
        const doc_url = data['error'].doc_url;
        const failureButtons = [
          {
            text: 'Visit Stripe',
            handler: () => {
              this.goToUrl(doc_url);
            }
          },
          {
            text: 'Close',
            handler: () => {
              this.goBack();
            }
          }
        ];
        this.showFailureMessage('Failed to Add Balance To Your Wallet', failureMessage, failureButtons);
      }
    });
  }

  onProceed() {
    console.log('Tokenizing bank account details')
    this.route.queryParams.subscribe(params => {
      this.paymentAmount = JSON.parse(params.amount);
    });
    this.paymentAmountInCents = Number(this.paymentAmount) * 100.0;
    this.basicService.showLoding('Please Wait');
    this.Stripe.createToken('bank_account', {
      account_holder_name: this.account_name,
      account_holder_type: this.account_type,
      currency: this.currency,
      country: 'US',
      account_number: this.account_number,
      routing_number: this.routing_number
    }).then((data) => {
      console.log('Tokenized Bank Account ' + data.token.id);
      this.basicService.hideLoading();
      this.createCustomer(data.token.id);
    })
  }

  createCustomer(token: string) {
    this.basicService.showLoding('Creating Customer...')
    console.log('Creating customer...');
    console.log(token);
    let params: any = {
      'description' : 'Debit through ACH',
      'source': token,
    }

    let option: any = {
      headers: this.headers,
      params
    }
    this.http.post(this.achCustomerUrl, null, option).subscribe(data => {
      this.basicService.hideLoading();
      console.log(data);
      if (data['status'] === 'success' && data['response'] !== null) {
        this.verifySource(data['response'].id, data['response'].default_source);
      }
    });
  }

  verifySource(customer_id: string, bank_id: string) {
    this.basicService.showLoding('Verifying Source...');
    console.log('Verifying Source...');
    console.log(customer_id);
    console.log(bank_id);

    let params: any = {
      'amount1': 32,
      'amount2': 45,
      'customer_id': customer_id,
      'ba_id': bank_id,
    }

    let option: any = {
      headers: this.headers,
      params
    }

    this.http.post(this.achMiniDepositUrl, null, option).subscribe(data => {
      console.log(data);
      this.basicService.hideLoading();
      if (data['status'] === 'success' && data['response'] !== null) {
        let verified: string = data['response'].status;

        if (verified === 'verified') {
          //const verificationMessage = 'Bank Account Verified Successfully';
          //const buttons = ['OK'];
          //this.showSuccessMessage('Bank Verification Status', verificationMessage, buttons);
          this.basicService.showLoding('Debiting From Your Account...');
          this.createChargeViaACH(data['response'].customer);
        }
      }
    });
  }

  createChargeViaACH(customer_id: string) {
    let params: any = {
      'amount': this.paymentAmountInCents,
      'currency': this.currency,
      'customer': customer_id,
    }

    let option: any = {
      headers: this.headers,
      params
    }

    console.log(params);
    this.http.post(this.achChargeUrl, null, option).subscribe(data => {
      console.log(data);
      this.basicService.hideLoading();

      if (data['status'] === 'success' && data['response'] !== null) {
        const successMessage = 'An amount of ' + this.currencyIcon + this.paymentAmount + ' has been debited successfully from your account. It might take 5 days to reflect in your wallet balance.';
        const buttons = [{text: 'OK', handler: () => {this.goBack();}}];
        this.showSuccessMessage('Debit Successful', successMessage, buttons);
      }
    })
  }

  goToUrl(redirectUrl: string) {
    this.inAppBrowser.create(redirectUrl);
  }

  showSuccessMessage(header, message, buttons) {
    this.alertController.create({
      header: header,
      message: message,
      buttons: buttons,
    }).then(res => {
      res.present();
    });
  }

  showFailureMessage(header, message, buttons) {
    this.alertController.create({
      header: header,
      message: message,
      buttons: buttons,
    }).then(res => {
      res.present();
    });
  }

  connectToBank() {
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
}
