import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-dashboard',
  templateUrl: './invoice-dashboard.page.html',
  styleUrls: ['./invoice-dashboard.page.scss'],
})
export class InvoiceDashboardPage implements OnInit {

  constructor(private location: Location, private router: Router) { }

  ngOnInit() {
  }

  viewInvoiceSentToUser() {
    console.log('View Invoice Sent To User Clicked');
    this.router.navigateByUrl('/invoices-sent-to-users');
  }

  viewInvoicesSentToYou() {
    console.log('View Invoices Sent To You Clicked');
    this.router.navigateByUrl('/invoices-sent-to-you');
  }


  goBack(): any {
    this.location.back();
  }

  raiseInvoice() {
    this.router.navigateByUrl('/raise-invoice');
  }

  goHome(): any {
    this.router.navigateByUrl('/home', {
      replaceUrl: true,
    });
  }
}
