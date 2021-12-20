import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FindUserListComponent } from '../find-user-list/find-user-list.component';
import { FindUserPage } from '../find-user/find-user.page';
import {ApiService} from '../../provider/api.service'
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy.page';
import { TestPagePage } from '../test-page/test-page.page';
import * as firebase from 'firebase';

@Component({
  selector: 'app-generateinvoice',
  templateUrl: './generateinvoice.page.html',
  styleUrls: ['./generateinvoice.page.scss'],
})
export class GenerateinvoicePage implements OnInit {
  public invoiceTo: any={};
  public invoiceForm:any={};
  public transaction:any={};
  public loginUID:any;
  public invoiceNo:any;
  userType: any;


  constructor(public modalController: ModalController,public api:ApiService) {
    this.loginUID=localStorage.getItem("loginUID");
    this.api.viewUser(this.loginUID).then(data=>{
      console.log(data);
      this.userType=data[0].type;
      console.log(this.userType);
      if(this.userType=='personal'){
        this.invoiceForm.companyName="self";
      }
      this.invoiceForm.senderName=data[0].full_name;
      this.invoiceForm.emailAddress=data[0].email;
    })
    console.log(this.loginUID);
    this.invoiceNo=this.generateInvoiceNo();
   }

  ngOnInit() {
  }
 
   generateInvoiceNo(){
    return Math.round(Math.random()*10000000);
   }
   
  async presentModal() {
    const modal = await this.modalController.create({
      component:FindUserPage
     
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    this.invoiceTo=data; 
    console.log(this.invoiceTo);
  }


  sendInvoice(){
    console.log(this.invoiceTo);
    console.log(this.invoiceForm);
    console.log(this.transaction);

    // firebase.database().ref("invoice").push({
    //   companyName:this.invoiceForm.companyName,
    //   senderName:this.invoiceForm.senderName,
    //   emailAddress:this.invoiceForm.emailAddress,
    //   full_name:this.invoiceTo.full_name,
    //   email:this.invoiceTo.email,
    //   transactionDate:this.transaction.date,
    //   transactionAmount:this.transaction.amount,
    //   invoiceForm:this.loginUID,
    //   invoiceTo:this.invoiceForm.uid,
    //   invoiceCreated:firebase.database.ServerValue.TIMESTAMP
    // }).then(data=>{
    //   console.log("Invoice is created");
    // })

   // firebase.database().ref("invoiceData")

   firebase.database().ref("invoice").push({
      companyName:this.invoiceForm.companyName,
      senderName:this.invoiceForm.senderName,
      emailAddress:this.invoiceForm.emailAddress,
      full_name:this.invoiceTo.full_name,
      email:this.invoiceTo.email,
      transactionDate:this.transaction.date,
      transactionAmount:this.transaction.amount,
      invoiceForm:this.loginUID,
      invoiceTo:this.invoiceTo.uid,
      invoiceStatus:"Pending",
      invoiceNo:this.invoiceNo,
      invoiceCreated:firebase.database.ServerValue.TIMESTAMP
    }).then(data=>{
      console.log("Invoice is created");
    })

  }

}
