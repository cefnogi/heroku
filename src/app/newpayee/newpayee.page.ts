import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../auth.service';
import { LoadingController } from '@ionic/angular'
import * as firebase from 'firebase'

@Component({
  selector: 'app-newpayee',
  templateUrl: './newpayee.page.html',
  styleUrls: ['./newpayee.page.scss'],
})
export class NewpayeePage implements OnInit {
  public user:any={};
  public loginUID:any;  
  constructor(public router: Router,public authService:AuthService) {
	this.loginUID=localStorage.getItem("loginUID");
	console.log(this.loginUID);		

	}

  ngOnInit() {
  }
  
  
  moneytransfer() {
    this.router.navigateByUrl('/moneytransfer');
  }
  
  addPayeeDetails(){
	  firebase.database().ref("bank_details").child(this.loginUID).push(this.user).then(data=>{
		  this.authService.Toast('Payee details is added');
		  this.user.payee_name="";
		  this.user.payee_mobile_number="";
		  this.user.payee_email="";
          this.user.payee_routing_number="";
          this.user.payee_account_number="";
		  this.user.payee_bank_name="";
	  })
	  //console.log(this.user);
  }
}
