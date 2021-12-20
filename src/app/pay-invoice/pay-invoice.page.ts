import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-pay-invoice',
  templateUrl: './pay-invoice.page.html',
  styleUrls: ['./pay-invoice.page.scss'],
})
export class PayInvoicePage implements OnInit {

  constructor(private location: Location,
    private router: Router) { }

  ngOnInit() {
  }

  goBack(): any {
    this.location.back();
  }

  goHome() {
    this.router.navigateByUrl('/home', {
      replaceUrl: true,
    })
  }

}
