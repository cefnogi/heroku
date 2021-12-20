import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {ApiService} from '../../provider/api.service';
import {Router, NavigationExtras} from '@angular/router';
@Component({
  selector: 'app-connected-account',
  templateUrl: './connected-account.page.html',
  styleUrls: ['./connected-account.page.scss'],
})
export class ConnectedAccountPage implements OnInit {
 public loginUID: string;
   linkHandler;
  token: string;
  user: any;

  public cryptoID: any;
  public full_name: any;
  public private_key: any;
  public request_status: any;
  public handle: any;

  cAccount: any[];
  constructor(public api: ApiService, public router: Router) {



    this.loginUID = localStorage.getItem('loginUID');
    console.log(this.loginUID);

    this.loginUID = localStorage.getItem('loginUID');

    // firebase.database().ref("users").child(this.loginUID).once("value",data=>{
    //    // console.log(data.val().bank_data.crypto_id);
    //     this.private_key=data.val().bank_data.private_key;
    //     this.full_name=data.val().full_name;
    //      this.handle=data.val().bank_data.handle;
    //     this.request_status=data.val().request_status;
    // })


    // firebase.database().ref('bank_info').child(this.loginUID).once('value', data => {
    //  // console.log(data.val());
    //  // console.log(this.retrieveChat(data))
    //   this.cAccount = this.retrieveChat(data);
    //   console.log(this.cAccount);
    // });
   }

  ngOnInit() {

  }

  linkedAccount(param) {
      console.log(param);
      const navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(param)
      }
    };
      this.router.navigate(['bank-activity'], navigationExtras);
   //   var newToken=param.token;

   /*       this.user={
	 // bankAmount:this.bank.deposit_amount,
      handle:this.handle,
      private_key:this.private_key,
      token:newToken
    }
    console.log(this.user);
     this.api.getAccessToken(this.user).subscribe((response:any)=>{

           console.log(response);
            console.log(response.message);
       }) */
     /*   this.api.linkAccount(this.user).subscribe((response:any)=>{

           console.log(response);
            console.log(response.message);
       }) */
  }
  retrieveChat(data) {
    const retrunArr = [];
    data.forEach(childsnapshot => {
      const item = childsnapshot.val();
      item.key = childsnapshot.key;
     // item.id=childsnapshot.val().id;
     // console.log(item.id);
      retrunArr.push(item);
    });
    return retrunArr;
  }
}
