import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-gasconnectionbill',
  templateUrl: './gasconnectionbill.page.html',
  styleUrls: ['./gasconnectionbill.page.scss'],
})
export class GasconnectionbillPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  transactionsuccess() {
    this.router.navigateByUrl('/transactionsuccess');
  }
}
