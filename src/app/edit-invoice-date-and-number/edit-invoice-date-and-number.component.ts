import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { BasicService } from 'src/services/basic.service';

@Component({
  selector: 'app-edit-invoice-date-and-number',
  templateUrl: './edit-invoice-date-and-number.component.html',
  styleUrls: ['./edit-invoice-date-and-number.component.scss'],
})
export class EditInvoiceDateAndNumberComponent implements OnInit {
  invoice_date: string;
  due_date: string;
  invoice_number: string;
  constructor(navParams: NavParams, public viewController: ModalController) { }

  ngOnInit() {
    //this.setupRaiseInvoiceForm();
  }

  getInvoiceDate() : string {
    return this.invoice_date.split('T')[0];
  }

  getDueDate() : string {
    return this.due_date.split('T')[0];
  }

  getInvoiceNumber() : string {
    return this.invoice_number;
  }

  save() {
    const invoice = {
      invoice_date: this.getInvoiceDate(),
      invoice_due_date: this.getDueDate(),
      invoice_number: this.getInvoiceNumber(),
    }
    console.log(invoice);
    this.viewController.dismiss(invoice);
  }

  dismiss() {
    this.viewController.dismiss();
  }

}
