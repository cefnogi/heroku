import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import {ApiService} from '../../provider/api.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-moneytransfer',
  templateUrl: './moneytransfer.page.html',
  styleUrls: ['./moneytransfer.page.scss'],
})
export class MoneytransferPage implements OnInit {
  public data: any;
  loginUID: string;
  public sourceUser: any = {};
  public amount: any = 0;
  public destinationUser = {
    funding_source: ''
  };
  transferData = {
    success: ''
  };
  constructor(public api: ApiService, private router: Router, private route: ActivatedRoute) {
    this.loginUID = localStorage.getItem('loginUID');
    console.log(this.loginUID);

    firebase.database().ref('users').child(this.loginUID).once('value', data => {
          console.log(data.val());
          this.sourceUser = data.val();
          console.log(this.sourceUser.funding_source);
    });


    this.route.queryParams.subscribe(params => {
      if (params && params.destinationUser) {
        this.data = JSON.parse(params.destinationUser);
        console.log(this.data);
        this.destinationUser = this.data;
        console.log(this.destinationUser.funding_source);
      }
    });
    console.log('TEST');
  }

  ngOnInit() {
    console.log('TEST');
  }
  pay() {
    this.api.showLoader('Sending....');
    console.log(this.sourceUser.funding_source);
    console.log(this.destinationUser.funding_source);
    console.log(this.amount);
    const body = {
      sourceUser: this.sourceUser.funding_source,
      destinationUser: this.destinationUser.funding_source,
      amount: this.amount
    };
    this.api.bankTransfer(body).subscribe((response: any) => {
      this.api.hideLoader();
      console.log(response);
      console.log(response.message);
      if (response.success) {
          this.api.Toast(response.message);
          const navigationExtra: NavigationExtras = {
            queryParams: {
            destinationUser: JSON.stringify(this.data),
            amount: this.amount
              }
          };
          this.router.navigate(['transactionsuccess'], navigationExtra);
        } else {
          this.api.Toast('Fund Transfer Failed');
        }

    });

  }

}
