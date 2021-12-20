import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { environment } from '../environments/environment';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
apiURL = 'https://plaidnew.herokuapp.com';
// apiURL: string = 'http://localhost:3000';
// apiURLSandbox:string="https://sandbox.plaid.com/";
// apiURL: string = 'https://silamoney.herokuapp.com';
// https://silamoney.herokuapp.com/
public client_id: any = '5eb269690b2dcc00124d060a';
public secret: any = '818b50ce1f0e17b5097227cd30a859';
 httpHeader = { headers: new HttpHeaders({

		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
		'Access-Control-Allow-Credentials': 'true',
		observe: 'response',
		responseType: 'text',
		'Access-Control-Expose-Headers': 'Location'
  })
};
httpOptions = {
  headers: new HttpHeaders({

    'Content-Type': 'application/x-www-form-urlencoded'

  })
};

  constructor(private http: HttpClient, public loadingCtrl: LoadingController,
              public toastCtrl: ToastController, ) {

    // "client_id":"5eb269690b2dcc00124d060a",
// "secret":"818b50ce1f0e17b5097227cd30a859",

  }


  showLoader(msg) {
    this.loadingCtrl.create({
        spinner: 'bubbles',
        message: msg
      }).then((res) => {
        res.present();
      });

    }

    // Hide the loader if already created otherwise return error
    hideLoader() {

      this.loadingCtrl.dismiss().then((res) => {
        console.log('Loading dismissed!', res);
      }).catch((error) => {
        console.log('error', error);
      });
    }
    async Toast(msg) {
      const toast = await this.toastCtrl.create({
        message: msg,
        duration: 2000,
        position: 'bottom',
        cssClass: 'customtoast',
      });
      toast.present();
    }




  // getDwollaToken(){
  //   var body={
  //     'grant_type':'client_credentials'
  //   }
  //   return  this.http.post('https://api-sandbox.dwolla.com/token',body,this.httpOptions);
  // }


  registerDowllaUser(param) {

     // return this.http.get("http://localhost:3000/register");
    const proxyurl = 'https://korsanywhere.herokuapp.com/';
    return  this.http.post(this.apiURL + '/create_dowlla_customer', param, this.httpHeader);

  }

  create_processor_token(param) {

    // return this.http.get("http://localhost:3000/register");
   const proxyurl = 'https://korsanywhere.herokuapp.com/';
   return  this.http.post(this.apiURL + '/create_processor_token', param, this.httpHeader);

 }
  requestKYCUser(param) {

    // return this.http.get("http://localhost:3000/register");
   const proxyurl = 'https://korsanywhere.herokuapp.com/';
   return  this.http.post(this.apiURL + '/request_kyc', param, this.httpHeader);

 }

   checkKYC(param) {

    // return this.http.get("http://localhost:3000/register");
   const proxyurl = 'https://korsanywhere.herokuapp.com/';
   return  this.http.post(this.apiURL + '/check_kyc', param, this.httpHeader);

 }

   issueSila(param) {

    // return this.http.get("http://localhost:3000/register");
   // const proxyurl = "https://korsanywhere.herokuapp.com/";
  return  this.http.post(this.apiURL + '/issue_sila', param, this.httpHeader);

 }

   linkAccount(param) {

    // return this.http.get("http://localhost:3000/register");
   // const proxyurl = "https://korsanywhere.herokuapp.com/";
  return  this.http.post(this.apiURL + '/link_account', param, this.httpHeader);

 }

    directLinkAccount(param) {

    // return this.http.get("http://localhost:3000/register");
   // const proxyurl = "https://korsanywhere.herokuapp.com/";
  return  this.http.post(this.apiURL + '/direct_link_account', param, this.httpHeader);

 }

  getAccessToken(param) {

    // return this.http.get("http://localhost:3000/register");
   // const proxyurl = "https://korsanywhere.herokuapp.com/";
  return  this.http.post(this.apiURL + '/get_access_token', param, this.httpHeader);

 }



   getAccounts(param) {

    // return this.http.get("http://localhost:3000/register");
   // const proxyurl = "https://korsanywhere.herokuapp.com/";
  return  this.http.post(this.apiURL + '/issue_sila', param, this.httpHeader);

 }

   getAccountsDetails(param) {

    // return this.http.get("http://localhost:3000/register");
   // const proxyurl = "https://korsanywhere.herokuapp.com/";
  return  this.http.post(this.apiURL + '/auth', param, this.httpHeader);

 }

 getAccountsInfo(param) {

    // return this.http.get("http://localhost:3000/register");
   // const proxyurl = "https://korsanywhere.herokuapp.com/";
  return  this.http.post(this.apiURL + '/accounts', param, this.httpHeader);

 }

  getAccountsBalance(param) {

    // return this.http.get("http://localhost:3000/register");
   // const proxyurl = "https://korsanywhere.herokuapp.com/";
  return  this.http.post(this.apiURL + '/balance', param, this.httpHeader);

 }


 bankTransfer(param) {
  return  this.http.post(this.apiURL + '/fund_transfer', param, this.httpHeader);
 }

 findBalance() {
  return  this.http.post(this.apiURL + '/find_balance', this.httpHeader);
 }

 findTransferStatus() {
  return  this.http.post(this.apiURL + '/find_transfer_status', this.httpHeader);
 }

  getTransactions(param) {

    // return this.http.get("http://localhost:3000/register");
   // const proxyurl = "https://korsanywhere.herokuapp.com/";
  return  this.http.post(this.apiURL + '/transactions', param, this.httpHeader);

 }



  fetchWebContent(ref) {
  // console.log("url:: "+firebase.database().ref(ref));
  const base = this;
  return  new Promise(function(resolve, reject) {
  firebase.database().ref(ref).on('value', resp => {
  let data = [];
  data = base.fetchSingleSnapshot(resp);
  resolve(data);

  });
});

 }

 fetchInnerWebContent(ref) {
  // console.log("url:: "+firebase.database().ref(ref));
  const base = this;
  return  new Promise(function(resolve, reject) {
  firebase.database().ref(ref).on('value', resp => {
  let data = [];
  data = base.fetchInnerSnapshot(resp);
  resolve(data);

  });
});

 }

 fetchInnerWebFilterContent(ref, filterBy, filterValue) {
  // console.log("url:: "+firebase.database().ref(ref));
  const base = this;
  return  new Promise(function(resolve, reject) {
  firebase.database().ref(ref).orderByChild(filterBy).equalTo(filterValue).on('value', resp => {
  let data = [];
  data = base.fetchInnerSnapshot(resp);
  resolve(data);

  });
});

 }

fetchSingleSnapshot(snapshot) {
  const returnArr = [];
  const item = snapshot.val();
 // item.key = snapshot.key;
  returnArr.push(item);
  return returnArr;
}
fetchInnerSnapshot(snapshot) {
  const returnArr = [];

  snapshot.forEach(childSnapshot => {
    const item = childSnapshot.val();

    item.key = childSnapshot.key;
   // if(item.status=="ACTIVE"){
    returnArr.push(item);
 //   }

  });

  return returnArr;
}


viewUser(userID) {
  const base = this;
  return new Promise((resolve, reject) => {
    firebase.database().ref('users').child(userID).once('value', data => {
      let fetchdata = [];
      fetchdata = base.fetchSingleSnapshot(data);
      resolve(fetchdata);
    });
  });

}


}
