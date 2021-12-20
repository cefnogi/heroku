import { Component, OnInit } from '@angular/core';
import {Router,NavigationExtras} from '@angular/router';
import * as firebase from 'firebase';
import {ApiService} from '../../provider/api.service'

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.page.html',
  styleUrls: ['./invoice-list.page.scss'],
})
export class InvoiceListPage implements OnInit {
  public segmentModel:any="sent";
  public pendingList:any=[];
  allListData:any=[];
  loginUID: string;
  recievedInvoiceList: any=[];
  allListSentData:any=[];
  destinationFundingSource: any;
  sourceFundingSource: any;
  allListClearedData:any=[];
  clearInvoiceList: any[];
  constructor(public router: Router,public api:ApiService) {
    this.loginUID=localStorage.getItem("loginUID");
    this.listInvoice();

   }

   listInvoice(){
    this.api.fetchInnerWebFilterContent("invoice","invoiceForm",this.loginUID).then(data=>{
      console.log(data);
      this.allListData=data;
      this.pendingList=[];
      this.allListData.forEach(element => {
        if(element.invoiceStatus=='Pending'){
          
          console.log(element);
          this.pendingList.push(element);
        }
                 
      });
      console.log(this.pendingList);
  })

  this.api.fetchInnerWebFilterContent("invoice","invoiceTo",this.loginUID).then(data=>{
    console.log(data);
    this.allListSentData=data;
    this.recievedInvoiceList=[];
    this.allListSentData.forEach(element => {
      if(element.invoiceStatus=='Pending'){
        
        console.log(element);
        this.recievedInvoiceList.push(element);
      }
               
    });
    console.log(this.recievedInvoiceList);
})

this.api.fetchInnerWebFilterContent("invoice","invoiceTo",this.loginUID).then(data=>{
  console.log(data);
  this.allListSentData=data;
  this.recievedInvoiceList=[];
  this.allListSentData.forEach(element => {
    if(element.invoiceStatus=='Pending'){
      
      console.log(element);
      this.recievedInvoiceList.push(element);
    }
             
  });
  console.log(this.recievedInvoiceList);
})


this.api.fetchInnerWebFilterContent("invoice","invoiceTo",this.loginUID).then(data=>{
  console.log(data);
  this.allListClearedData=data;
  this.clearInvoiceList=[];
  this.allListClearedData.forEach(element => {
    if(element.invoiceStatus=='Cleared'){
      
      console.log(element);
      this.clearInvoiceList.push(element);
    }
             
  });
  console.log(this.clearInvoiceList);
})


   }

  ngOnInit() {
  }

  generateinvoice(){
    this.router.navigateByUrl('/generateinvoice');
  }

  payInvoice(param){
    console.log(param);
    this.api.viewUser(param.invoiceForm).then(data=>{
      console.log(data);
      this.destinationFundingSource=data[0].funding_source;
      console.log(this.destinationFundingSource);
    }).then(data=>{

      this.api.viewUser(param.invoiceTo).then(data=>{
        console.log(data);
        this.sourceFundingSource=data[0].funding_source;
        console.log(this.sourceFundingSource);
      }).then(data=>{
  
        console.log(this.destinationFundingSource);
        console.log(this.sourceFundingSource);
  
        var body={
          sourceUser:this.sourceFundingSource,
          destinationUser:this.destinationFundingSource,
          amount:20
        }

        this.api.bankTransfer(body).subscribe((response:any)=>{
          this.api.hideLoader();
          console.log(response);
            console.log(response.message);
            if(response.success){
              this.api.Toast(response.message);
              firebase.database().ref("invoice").child(param.key).update({
                invoiceStatus:"Cleared"
              })
              this.listInvoice()
              // let navigationExtra: NavigationExtras = {
              //   queryParams: {
              //   destinationUser: JSON.stringify(this.data),
              //   amount: this.amount
              //     }
              // };
              // this.router.navigate(['transactionsuccess'],navigationExtra);
            }else{
              this.api.Toast("Fund Transfer Failed");
              
            }
          
        })

  
      })

      
    })

   
    console.log(this.destinationFundingSource);
    console.log(this.sourceFundingSource);
 
    



  }

}
