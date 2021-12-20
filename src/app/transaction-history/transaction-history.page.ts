import { BankListModalComponent } from './../bank-list-modal/bank-list-modal.component';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TransactionService } from './../../services/transaction-service';
import { BasicService } from 'src/services/basic.service';
import { AuthService } from '../auth.service';
import { Router, NavigationExtras } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.page.html',
  styleUrls: ['./transaction-history.page.scss'],
})
export class TransactionHistoryPage implements OnInit {

  constructor(
    private location: Location,
    private transactionServices: TransactionService,
    private basicService: BasicService,
    private authService: AuthService,
    private router: Router,
    public modalController: ModalController
  ) { }

  historyList: any[] = [];
  customerId: any = null;
  transactionDate: string = '';
  transactionTime: string = '';


  ngOnInit() {
    this.getAllTransactionHistory();
  }

  gettingTransactions(): any {
    this.transactionServices.getAlltransaction().then(data => {
      console.log(data);
      if (data && data.response) {
        this.historyList = data.response.data;

      }
    }).catch((e) => {
      this.authService.Toast(e.message);
    });
  }

  getAllTransactionHistory() {
    this.transactionServices.getAllTransactionHistory().then(data => {
      console.log(data);
      if (data && data.response) {
        this.historyList = data.response;
        for (let i = 0; i <= this.historyList.length; i++) {
          this.parseTransactionDateTime(i);
        }
      }
    }).catch((e) => {
      this.authService.Toast(e.message);
    });
  }



  goBack(): any {
    this.location.back();
  }

  showFullHistory(history): any {
    if (history && history.id) {
      this.customerId = history.id
      this.router.navigate([`/transaction-history/transaction-full-detail/${this.customerId}`]);
    }
  }

  // Show Bank List
  async showBankList() {
    const modal = await this.modalController.create({
      component: BankListModalComponent
    });
    return await modal.present();
  }

  showHistoryOptions(i: number) {
    const transactions = this.historyList.map((item: any, index: any) => {
      if (index === i) {
        return item;
      }
      return {
        ...item,
        showOptions: false,
      }
    })
    this.historyList = transactions;
    if (this.historyList[i].showOptions) {
      this.historyList[i].showOptions = false;
      return;
    }
    this.historyList[i].showOptions = true;
  }


  parseTransactionDateTime(i: number) {
    const transactions = this.historyList.map((item: any, index: any) => {
      if (index === i) {
        return item;
      }
      return {
        ...item,
        transaction_date: item.created_at.split('T')[0],
        transaction_time: item.created_at.split('T')[1].split('.')[0],
      }
    })
    this.historyList = transactions;
  }

  goHome() {
    this.router.navigateByUrl('/home', {
      replaceUrl: true,
    })
  }

  viewSingleHistory(index: number){
    for (let i = 0; i < this.historyList.length; i++) {
      if (i == index) {
        const history = {
          amount: this.historyList[i].history.amount,
          transaction_id: this.historyList[i].history.id,
          transaction_type: this.historyList[i].payment_mode,
          transaction_date: this.historyList[i].transaction_date,
          transaction_time: this.historyList[i].transaction_time,
          description: this.historyList[i].history.description,
          receipt_url: this.historyList[i].history.receipt_url,
          card_brand: this.historyList[i].history.source !== (null || undefined) ? this.historyList[i].history.source.card.brand : ''
        }

        let navigationExtras: NavigationExtras = {
          queryParams: {
            transactionParams: JSON.stringify(history),
          }
        }
        console.log(history)
        this.router.navigate(['single-transaction-history'], navigationExtras);
      }
    }    
  }
}


