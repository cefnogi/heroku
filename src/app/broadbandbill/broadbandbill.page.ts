import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-broadbandbill',
  templateUrl: './broadbandbill.page.html',
  styleUrls: ['./broadbandbill.page.scss'],
})
export class BroadbandbillPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  transactionsuccess() {
    this.router.navigateByUrl('/transactionsuccess');
  }

}
