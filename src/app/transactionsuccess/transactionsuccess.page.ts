import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router,NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-transactionsuccess',
  templateUrl: './transactionsuccess.page.html',
  styleUrls: ['./transactionsuccess.page.scss'],
})
export class TransactionsuccessPage implements OnInit {
  data: any;
  amountpaid: any;

  constructor(private router:Router,private activatedroute: ActivatedRoute) {
    this.activatedroute.queryParams.subscribe(params => {
      console.log(params);   
      console.log(params.destinationUser);
      console.log(params.amount);
      if (params && params.destinationUser) {
        this.data = JSON.parse(params.destinationUser);
        this.amountpaid = JSON.parse(params.amount);
        console.log(this.data);
      }
    })
   }

  ngOnInit() {
  }

}
