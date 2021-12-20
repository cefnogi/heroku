import { Component, OnInit, NgZone } from '@angular/core';
import {Router} from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-my-wallet',
  templateUrl: './my-wallet.page.html',
  styleUrls: ['./my-wallet.page.scss'],
})
export class MyWalletPage implements OnInit {

 	public bank: any = {};
	public refBankDetails: any;
	public loginUID: any;
	public accountDetails: any;
	public amount: any;
	public wallet_amount: any;
	constructor(public router: Router, public zone: NgZone) {
			this.loginUID = localStorage.getItem('loginUID');
			console.log(this.loginUID);



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
  newpayee() {
    this.router.navigateByUrl('/newpayee');
 }

 selectBank(param) {
	 console.log(param);
 }

 addAmountToWallet() {

	 console.log(this.bank);
	 firebase.database().ref('wallet').child(this.loginUID).push(this.bank).then(data => {
			firebase.database().ref('users').child(this.loginUID).orderByChild('wallet').once('value', data => {
				console.log(data.val().wallet);
				this.amount = data.val().wallet + this.bank.deposit_amount;
				console.log(this.amount);
				firebase.database().ref('users').child(this.loginUID).update({
					wallet: this.amount
				});
			});
	 });


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
