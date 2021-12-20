import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-electricitybill',
  templateUrl: './electricitybill.page.html',
  styleUrls: ['./electricitybill.page.scss'],
})
export class ElectricitybillPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  transactionsuccess() {
    this.router.navigateByUrl('/transactionsuccess');
  }

}
