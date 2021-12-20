import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-bank-activity-details',
  templateUrl: './bank-activity-details.page.html',
  styleUrls: ['./bank-activity-details.page.scss'],
})
export class BankActivityDetailsPage implements OnInit {
public data:any;
public newData:any;
public type:any;
public loginUID:any;
public user:any={};
public private_key:any;
public full_name:any;
public handle:any;
public request_status:any;
  items: any=[];
  AccountsDetails: any=[];
  typeofcheck: any;
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe((res)=>{
      console.log(res)
      this.items= JSON.parse(res.special);
      console.log(this.items.request_id);  
      this.typeofcheck=res.type;
      console.log(this.items.accounts);
      this.AccountsDetails =this.items.accounts;
      //this.getresult(this.items.accounts);
      console.log(this.AccountsDetails);
  });
   this.loginUID=localStorage.getItem("loginUID");
    console.log(this.loginUID);
   }

  ngOnInit() {
  }
  
  linkAccount(param){
      console.log(param);
  }
  
json2array(json){
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function(key){
        result.push(json[key]);
    });
    return result;
}
getresult(all){
  all.forEach(element => {
    console.log(element.balances);
      this.AccountsDetails.push({
       accountId: element.account_id,
       available: element.balances.available,
       current: element.balances.current,
       iso_currency_code: element.balances.iso_currency_code,
       limit: element.balances.limit,
       unofficial_currency_code: element.balances.unofficial_currency_code,
       name: element.name,
       official_name: element.official_name,
       type: element.type,
       subtype: element.subtype 
    }); 
    console.log(this.AccountsDetails);
  });
    }
}
