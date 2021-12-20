import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-paybill',
  templateUrl: './paybill.page.html',
  styleUrls: ['./paybill.page.scss'],
})
export class PaybillPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  electricitybill() {
    this.router.navigateByUrl('/electricitybill');
  }
  broadbandbill() {
    this.router.navigateByUrl('/broadbandbill');
  }
  gasconnectionbill() {
    this.router.navigateByUrl('/gasconnectionbill');
  }
  dthdashboard() {
      this.router.navigateByUrl('/dthdashboard');
  }
  addPayee(){
	   this.router.navigateByUrl('/add-payee');
  }
}
