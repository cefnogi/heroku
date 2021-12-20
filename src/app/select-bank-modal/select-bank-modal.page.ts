import { NavParams, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-select-bank-modal',
  templateUrl: './select-bank-modal.page.html',
  styleUrls: ['./select-bank-modal.page.scss'],
})
export class SelectBankModalPage implements OnInit {
  banksList: string [] = [
    "JP Morgan Chase",
    "Bank Of America",
    "Wells Fargo",
    "Citigroup",
    "U.S. Bancorp",
    "Truist Bank",
    "PNC Financial Services Group",
    "TD Group U.S. Holdings LLC",
    "Bank Of New York Mellon Corp.",
    "Capital One Financial Corp.",
    "State Street Corp.",
    "Goldman Sach Group Inc.",
    "Fifth Third Bank",
    "HSBC",
  ];
  constructor(navParams: NavParams, public viewController: ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.viewController.dismiss();
  }
}
