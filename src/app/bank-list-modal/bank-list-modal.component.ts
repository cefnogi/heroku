import { BasicService } from 'src/services/basic.service';
import { GetBankListServices } from './../../services/bank-list-service';
import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@Component({
  selector: 'app-bank-list-modal',
  templateUrl: './bank-list-modal.component.html',
  styleUrls: ['./bank-list-modal.component.scss'],
})
export class BankListModalComponent implements OnInit {
  banksList: string[] = [
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

  allBanks: any[] = [];
  individualBanks: any[] = [];
  bank: string = '';
  bankName: string = '';
  filterTerm: string = '';

  constructor(
    navParams: NavParams,
    public viewController: ModalController,
    public getBankListService: GetBankListServices,
    public location: Location,
    public basicServices: BasicService,
    public authServices: AuthService) { }

  ngOnInit() {
    this.getAllBanks();
    this.populateIndividualBanks();
  }

  initializeRadioButtons() {

  }

  goBack(): any {
    this.location.back();
  }

  getAllBanks() {
    const formData = new FormData();
    formData.append('count', '100');
    formData.append('country_codes', 'US');
    formData.append('offset', '0');
    this.basicServices.showLoding('Getting Banks...');
    this.getBankListService.getBankListRequest(formData).then(data => {
      console.log(data);
      if (data && data.institutions) {
        this.allBanks = data.institutions;
        console.log(this.allBanks)
      }
    }).catch(e => {
      this.authServices.Toast(e.message);
    }).finally(() => {
      this.basicServices.hideLoading();
    })

  }

  populateIndividualBanks() {
    console.log('Populate Individual Banks');
    let individualBank = {};
    for (let bank of this.allBanks) {
      const institution_id = bank.institution_id;
      const institution_name = bank.institution_name;

      individualBank = {
        institution_id,
        institution_name
      }
    }
    this.individualBanks.push(individualBank);
    console.log(this.individualBanks)
  }

  dismiss() {
    this.viewController.dismiss();
  }

}