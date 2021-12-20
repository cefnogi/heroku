import { Component, OnInit, NgZone } from '@angular/core';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {ApiService} from '../../provider/api.service';
import {ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
	public bank: any = {};
	public refBankDetails: any;

	public accountDetails: any;
	public amount: any;
	public wallet_amount: any;

	linkHandler;
  token: string;
  user: any;
  loginUID: string;
  public cryptoID: any;
  public full_name: any;
  public private_key: any;
  public request_status: any;
  public handle: any;

	constructor(public router: Router, public zone: NgZone, public api: ApiService, public alertController: AlertController) {



			this.loginUID = localStorage.getItem('loginUID');
			console.log(this.loginUID);


			firebase.database().ref('users').child(this.loginUID).once('value', data => {
        console.log(data.val().bank_data.crypto_id);
        this.private_key = data.val().bank_data.private_key;
        this.handle = data.val().bank_data.handle;
        this.request_status = data.val().request_status;

		      console.log(this.private_key);
		// console.log(this.full_name);
		      console.log(this.handle);
		      console.log(this.request_status);
    });




			firebase.database().ref('users').child(this.loginUID).orderByChild('wallet').once('value', data => {
				this.zone.run(() => {
				console.log(data.val().wallet);
				this.wallet_amount = data.val().wallet;
				});

			});





		 this.refBankDetails = firebase.database().ref('bank_details');
	// 	this.walletAmount=firebase.database().ref("wallet");
		// this.refBankDetails = firebase.database().child(this.loginUID).ref('bank_details/');
		 this.refBankDetails.child(this.loginUID).on('value', resp => {

			 this.zone.run(() => {
			this.accountDetails = [];
			this.accountDetails = this.retrieveCardInfo(resp);
			console.log(this.accountDetails);
			 });

		});
	 // this.refBankDetails = firebase.database().ref('bank_details/');

	 }

  ngOnInit() {
  }

   async presentAlert(msg: any) {
    const alert = await this.alertController.create({
      header: 'Alert',

      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  newpayee() {
    this.router.navigateByUrl('/newpayee');
 }

 selectBank(param) {
	 console.log(param);
 }

 addAmountToWallet() {

	// console.log(this.bank);

	   this.user = {
	  bankAmount: this.bank.deposit_amount,
      handle: this.handle,
      private_key: this.private_key
    };
	   console.log(this.user);

	   this.api.getAccounts(this.user).subscribe((response: any) => {
	 // checkKYC  getAccounts
	// this.api.issueSila(this.user).subscribe((response:any)=>{
	//  this.api.issueSila(this.user).subscribe((response:any)=>{
      console.log(response);
	     this.presentAlert(response.message);
     /*  if(response.status=="SUCCESS"){
          firebase.database().ref("users").child(this.loginUID).update({
              request_status:response.status
          })
           //this.router.navigateByUrl('/home');
      }else{

      }

    console.log(response); */
  });


	/*  firebase.database().ref("wallet").child(this.loginUID).push(this.bank).then(data=>{
			firebase.database().ref("users").child(this.loginUID).orderByChild("wallet").once("value",data=>{
				console.log(data.val().wallet);
				this.amount=data.val().wallet+this.bank.deposit_amount;
				console.log(this.amount);
				firebase.database().ref("users").child(this.loginUID).update({
					wallet:this.amount
				})
			})
	 }) */


 }


    retrieveCardInfo(data) {
    const returnArr = [];
    data.forEach(snapshots => {
      const item = snapshots.val();
      console.log(item);
      item.key = snapshots.key;

      // console.log(item.key);
    //  if(item.key != this.userId){
      returnArr.push(item);
     // }
  });
    return returnArr;
  }


}
