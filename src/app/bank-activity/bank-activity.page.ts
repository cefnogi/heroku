import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import {ModalController, AlertController } from '@ionic/angular';
import {ApiService} from '../../provider/api.service';
import {AuthService} from '../auth.service';
// import { ModalController } from '@ionic/angular';
import * as firebase from 'firebase';
@Component({
  selector: 'app-bank-activity',
  templateUrl: './bank-activity.page.html',
  styleUrls: ['./bank-activity.page.scss'],
})
export class BankActivityPage implements OnInit {
public data: any;
public loginUID: any;
public passeData: any = {};
public user: any = {};
public request_status: any;
public private_key: any;
public full_name: any;
public handle: any;
public funding_source_request: any = {};
  constructor(private route: ActivatedRoute, private router: Router, public api: ApiService, public modalController: ModalController, public alertController: AlertController, public authService: AuthService) {
             this.loginUID = localStorage.getItem('loginUID');
             console.log(this.loginUID);
              // this.api.getDwollaToken().subscribe((response:any)=>{
              //   console.log(response)
              // },error=>{
              //   console.log(error);
              // })
             firebase.database().ref('users').child(this.loginUID).once('value', data => {
        // this.private_key=data.val().bank_data.private_key;
        console.log(data.val());
        this.full_name = data.val().full_name;
        this.funding_source_request.dwolla_customer_url = data.val().dwolla_customer_url;

         // this.handle=data.val().bank_data.handle;
        // this.request_status=data.val().request_status;


    });
            // let this=
             this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = JSON.parse(params.special);
        console.log(this.data);
        this.funding_source_request.ITEM_ID = this.data.item_id;

        this.funding_source_request.ACCESS_TOKEN = this.data.access_token;
         // this.accounts();
        const dataPass = {
          access_token: this.data.access_token
        };
        console.log(dataPass);
        this.api.getAccountsInfo(dataPass).subscribe((response: any) => {
              console.log(response.auth.accounts[0].account_id);
              this.funding_source_request.account_id = response.auth.accounts[0].account_id;
             // console.log(response.accounts[0].account_id);
              console.log(this.funding_source_request);
              this.api.create_processor_token(this.funding_source_request).subscribe((response: any) => {
                  console.log(response);
                  if (response.success) {
                      console.log(response);
                      firebase.database().ref('users').child(this.loginUID).update({
                        funding_source: response.funding_source,
                        funding_source_status: 'added'
                      }).then(data => {
                        this.authService.Toast('Funding Source is added, You can do Fund Transfer');
                      });

                  } else {
                    console.log(response.err.body.message);
                    this.authService.Toast(response.err.body.message);
                  }
             });
            });



      }
    });


   // this.accounts();
             this.findData();

      }

      findData() {
        this.api.fetchInnerWebContent('users').then(bata => {
          console.log(bata);

          // 'this.featuredContentPointer=bata;
      });
      }

  ngOnInit() {
  }
  linkBankAccount() {
      console.log(this.user);
      console.log(this.data);
      this.passeData = {
          handle: this.user.handle,
          private_key: this.user.private_key,
          token: this.data.token
      };
      console.log(this.passeData);
      this.api.linkAccount(this.passeData).subscribe((response: any) => {

           console.log(response);
           console.log(response.message);
           this.presentAlert(response.message);
       });
  }
   async presentAlert(msg: any) {
    const alert = await this.alertController.create({
      header: 'Alert',

      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
  linkBankAccountDirect() {
         console.log(this.user);
         console.log(this.data);
         this.passeData = {
              handle: this.user.handle,
              private_key: this.user.private_key,
              token: this.data.token
          };
         console.log(this.passeData);
         this.api.directLinkAccount(this.passeData).subscribe((response: any) => {

           console.log(response);
           console.log(response.message);
       });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: 'bank-activity-details'
    });
    return await modal.present();
  }
  balance() {
       console.log(this.data);
       console.log(this.api.client_id);
       console.log(this.api.secret);
     /*    this.api.getAccountsDetails(this.data).subscribe((response:any)=>{

           console.log(response);
        }) */
       this.api.getAccountsBalance(this.data).subscribe((response: any) => {

           console.log(response);

           const navigationExtras: NavigationExtras = {
              queryParams: {
              special: JSON.stringify(response.balance),
              type: 'balance'
                }
            };
           this.router.navigate(['bank-activity-details'], navigationExtras);


        });
  }

  bankTransfer() {
    console.log('TEST');
    this.api.bankTransfer(this.data).subscribe((response: any) => {

      console.log(response);

      //   let navigationExtras: NavigationExtras = {
      //    queryParams: {
      //    special: JSON.stringify(response),
      //    type:"balance"

      //      }
      //  };
      //  this.router.navigate(['bank-activity-details'],navigationExtras);


   });
  }

  findBalance() {
    console.log('Pro');
    this.api.findBalance().subscribe((response: any) => {
        console.log(response);
    });

    // this.api.findTransferStatus().subscribe((response:any)=>{
    //   console.log(response);
    // })

    //
  }

  accounts() {
    console.log(this.data);
    console.log(this.api.client_id);
    console.log(this.api.secret);
    const dataPass = {
      access_token: this.data.access_token
    };
    console.log(dataPass);
    this.api.getAccountsInfo(dataPass).subscribe((response: any) => {

           console.log(response);
           const navigationExtras: NavigationExtras = {
              queryParams: {
              special: JSON.stringify(response.auth),
              type: 'accounts'
                }
            };
           this.router.navigate(['bank-activity-details'], navigationExtras);
        });
  }

  sendMoney() {
    this.router.navigate(['people']);
  }

  transactions() {
    const body = {
      access_token: this.data.access_token,
      startdate: '2021-02-02',
      enddate: '2022-01-01'
    };
    this.api.getTransactions(body).subscribe((response: any) => {

           console.log(response);

           const navigationExtras: NavigationExtras = {
              queryParams: {
              special: JSON.stringify(response),
              type: 'transaction'

                }
            };
           this.router.navigate(['bank-activity-details'], navigationExtras);

        });
  }



}
