import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dthdashboard',
  templateUrl: './dthdashboard.page.html',
  styleUrls: ['./dthdashboard.page.scss'],
})
export class DthdashboardPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  dthbill() {
    this.router.navigateByUrl('/dthbill');
  }
}
