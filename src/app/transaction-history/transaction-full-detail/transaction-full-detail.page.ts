import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../../services/transaction-service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Clipboard } from '@ionic-native/clipboard/ngx';

@Component({
  selector: 'app-transaction-full-detail',
  templateUrl: './transaction-full-detail.page.html',
  styleUrls: ['./transaction-full-detail.page.scss'],
})
export class TransactionFullDetailPage implements OnInit {

  constructor(
    private transactionService: TransactionService,
    private authService: AuthService,
    private router: ActivatedRoute,
    private clipboard: Clipboard,
    private location: Location,
  ) { }

  customerId: any = null;
  perticularHistory: any = null;
  destination: any = null;
  transactionId: any = '';

  ngOnInit() {
    this.router.params.subscribe(params => {
      if (params.id) {
        this.customerId = params.id;
      }
    });
    this.getPerticularHistory();
  }

  getPerticularHistory() {
    if (this.customerId) {
      this.transactionService.getPerticularHistory(this.customerId).then(data => {
        if (data && data.response) {
          this.perticularHistory = data.response;
          this.destination = data.response.destination;
          if (this.destination) {
            this.transactionService.getAccountDetail(this.destination).then(item => {
              if (item.response) {
                const personalDetail = item.response;
                this.perticularHistory = { ...this.perticularHistory, personalDetail };
                this.transactionId = this.perticularHistory.balance_transaction;
              }
            }).catch((e) => {
              this.authService.Toast(e.message)
            })
          }
        }
      }).catch((e) => {
        this.authService.Toast(e.message)
      })
    }
  }

  goBack(): any {
    this.location.back();
  }

  copyTransaction() {
    if(this.transactionId) {
      this.clipboard.copy(this.transactionId).then((data: any) => {
        this.authService.Toast('SuccessFully Copied');
      })
    }
  }

}
