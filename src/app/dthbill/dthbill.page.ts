import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dthbill',
  templateUrl: './dthbill.page.html',
  styleUrls: ['./dthbill.page.scss'],
})
export class DthbillPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  transactionsuccess() {
    this.router.navigateByUrl('/transactionsuccess');
  }
}
