import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-single-transaction-history',
  templateUrl: './single-transaction-history.page.html',
  styleUrls: ['./single-transaction-history.page.scss'],
})
export class SingleTransactionHistoryPage implements OnInit {
  transaction_id: string = '';
  amount: string = '';
  transaction_type: string = '';
  transaction_date: string = '';
  transaction_time: string = '';
  description: string = '';
  card_brand: string = '';
  receipt_url: string = '';
  transaction: any = {};

  constructor(private location: Location,
    private route: ActivatedRoute,
    private inAppBrowser: InAppBrowser) { 
      this.route.queryParams.subscribe(params => {
        console.log(params);
        if ( params && params.transactionParams){
          this.transaction = JSON.parse(params.transactionParams)
          console.log(this.transaction)
        }
      })
    }

  ngOnInit() {
    this.initTransactionParams();
  }

  initTransactionParams() {
    this.amount = '$' + (parseFloat(this.transaction.amount)/100.0).toString();
    this.transaction_id = this.transaction.transaction_id;
    this.transaction_type = this.transaction.transaction_type;
    this.transaction_date = this.transaction.transaction_date;
    this.transaction_time= this.transaction.transaction_time;
    this.description = this.transaction.description;
    this.receipt_url = this.transaction.receipt_url;
    this.card_brand = this.transaction.card_brand;
  }

  goBack(): any {
    this.location.back();
  }

  viewReceipt() {
    console.log('View Receipt Clicked')
    this.inAppBrowser.create(this.receipt_url);
  }

}
