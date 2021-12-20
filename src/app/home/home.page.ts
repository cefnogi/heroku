import { GetNotificationServices } from './../../services/get-notification';
import { BankListModalComponent } from './../bank-list-modal/bank-list-modal.component';
import { SelectBankModalPage } from './../select-bank-modal/select-bank-modal.page';
import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { PlaidOnSuccessArgs } from 'ngx-plaid-link/lib/interfaces';
import { ApiService } from '../../provider/api.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Platform } from '@ionic/angular';
import { GetPaymentRequestServices } from 'src/services/get-payment-request';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    linkHandler;
    token: string;
    user: any;
    loginUID: string;
    public cryptoID: any;
    public full_name: any;
    public private_key: any;
    public request_status: any;
    public handle: any;
    userdata: any = {};
    allNotifications: any[] = [];
    individualNotifications: any[] = [];
    user_id: string = localStorage.getItem('user_id');
    user_email: string = localStorage.getItem('user_email');
    notificationClickSubscribe: any = {};

    constructor(public router: Router,
        public modalController: ModalController,
        private iab: InAppBrowser,
        public api: ApiService,
        private localNotifications: LocalNotifications,
        private getNotificationService: GetNotificationServices,
        private getPaymentRequestService: GetPaymentRequestServices,
        private platform: Platform,
        public alertController: AlertController) {

        // this.loginUID=localStorage.getItem("loginUID");
        // this. GetAccount();
        // firebase.database().ref("users").child(this.loginUID).once("value",data=>{
        //     console.log(data.val().bank_data.crypto_id);
        //     this.private_key=data.val().bank_data.private_key;
        //     this.full_name=data.val().full_name;
        //      this.handle=data.val().bank_data.handle;
        //     this.request_status=data.val().request_status;
        // })

        const token = localStorage.getItem('token')
        if (!token) {
            console.log(token)
            this.router.navigateByUrl('/welcome');
        }
        this.getAllPaymentRequest();
        //this.getAllNotifications();
        //this.requestNotification();
    }

    getAllNotifications() {
        this.getNotificationService.getNotification(this.user_id).then(data => {
            console.log(data);
            if (data && data.response) {
                if (data.response.hasOwnProperty('error')) {
                    throw data.response.error;
                } else {
                    console.log(data);
                    this.allNotifications = data.response;
                    console.log(this.allNotifications);
                    this.populateIndividualNotifications();
                    this.requestNotificationNew();
                }
            }
        })
    }

    getAllPaymentRequest() {
        const formData = new FormData();
        formData.append('email', this.user_email);
        this.getPaymentRequestService.getPaymentRequest(formData).then((data) => {
            console.log(data);
            if (data && data.response) {
                if (data.response.hasOwnProperty('error')) {
                    throw data.response.error;
                } else {
                    console.log(data);
                    this.allNotifications = data.response;
                    console.log(this.allNotifications);
                    this.populateIndividualNotifications();
                    this.requestNotificationNew();
                }
            }
        })
    }

    requestNotification() {
        this.getNotificationService.getNotification(this.user_id).then(data => {
            console.log(data);
            if (data && data.response) {
                if (data.response.hasOwnProperty('error')) {
                    throw data.response.error;
                } else {
                    console.log(data.response);
                    const message = `${data.response['user_name']} has requested an amount of $${data.response['amount']}`
                    if (this.platform.is('cordova')) {
                        if (!(Object.keys(data.response).length === 0) && data.response.constructor === Object) {
                            //this.showNotification(message)
                        }
                    }
                }
            }
        })
    }

    requestNotificationNew() {
        for (let i = 0; i < this.individualNotifications.length; i++) {
            const individualNotification = this.individualNotifications[i];
            const message = `${individualNotification['from_name']} has requested an amount of $${individualNotification['amount']}`
            console.log(`Platform Is Cordova? ${this.platform.is('cordova')}`);
            if (this.platform.is('cordova')) {
                this.showNotification(individualNotification, message, i);
            }
            else {
                console.log(message);
            }
        }
    }

    unsubscribeNotificationClick() {
        this.notificationClickSubscribe.unsubscribe();
    }

    showNotification(individualNotification: any, message: string, id: number) {
        this.notificationClickSubscribe = this.localNotifications.on('view').subscribe(() => {
            this.viewInvoice(individualNotification);
            this.unsubscribeNotificationClick();
        })

        // Schedule a single notification
        this.localNotifications.schedule({
            id,
            title: 'Payment Request',
            text: message,
            trigger: { at: new Date(new Date().getTime() + 3600) },
            actions: [{id: 'view', title: 'View Invoice'}]

        });

    }

    click() {

    }

    viewInvoice(individualNotification: any) {
        const invoice = {
            amount: individualNotification.amount,
            id: individualNotification.id,
            invoice_date: individualNotification.invoice_date,
            invoice_due_date: individualNotification.invoice_due_date,
            from_name: individualNotification.from_name,
            from_email: individualNotification.from_email,
            to_name: individualNotification.to_name,
            to_email: individualNotification.to_email,
            created_at: individualNotification.created_at,
            updated_at: individualNotification.updated_at,
        }
        let navigationExtras: NavigationExtras = {
            queryParams: {
                invoiceParams: JSON.stringify(invoice),
            }
        }

        this.router.navigate(['single-invoice'], navigationExtras);
    }

    populateIndividualNotifications() {
        let individualNotification = {};
        for (let notification of this.allNotifications) {
            const id = notification.id;
            const amount = notification.amount;
            const invoice_date = notification.invoice_date;
            const invoice_due_date = notification.invoice_due_date;
            const invoice_number = notification.invoice_number;
            const from_name = notification.from_name;
            const from_email = notification.from_email;
            const to_name = notification.to_name;
            const to_email = notification.to_email;
            const for_user_id = notification.for_user_id;
            const created_at = notification.created_at;
            const updated_at = notification.updated_at;
            individualNotification = {
                id,
                invoice_date,
                invoice_due_date,
                invoice_number,
                from_name,
                from_email,
                to_name,
                to_email,
                amount,
                for_user_id,
                created_at,
                updated_at,
            }
            this.individualNotifications.push(individualNotification);
        }
        console.log(this.individualNotifications);
    }

    account() {

        const navigationExtras: NavigationExtras = {
            queryParams: {
                private_key: this.private_key,
                handle: this.handle
            }
        };

        //   this.router.navigateByUrl('/account');
        this.router.navigate(['account'], navigationExtras);

    }

    invoiceList() {
        this.router.navigateByUrl('/invoice-list');
    }

    async presentAlert(msg: any) {
        const alert = await this.alertController.create({
            header: 'Alert',

            message: msg,
            buttons: ['OK']
        });

        await alert.present();
    }

    GetAccount() {
        firebase.database().ref('users').child(this.loginUID).once('value', data => {
            console.log(data);
            this.userdata = data.val();
            console.log(this.userdata);
        });
    }


    transferMoney() {
        //this.router.navigateByUrl('/connected-account');
        // this.router.navigateByUrl('/transfermoney');
        this.router.navigateByUrl('/pay-employees-and-services');
    }

    goToPayOrTransferMoney() {
        this.router.navigateByUrl('/pay-transfer-money');
    }

    chequedeposit() {
        this.router.navigateByUrl('/chequedeposit');
    }

    paybill() {
        this.router.navigateByUrl('/paybill');
    }

    transferToBankAccount() {
        this.router.navigateByUrl('/transfer-to-bank-account');
    }

    generateinvoice() {
        console.log('Generate Invoice')
        this.router.navigateByUrl('/generateinvoice');
    }

    goToInvoiceDashboard() {
        this.router.navigateByUrl('/invoice-dashboard');
    }

    goToMyLinkedAccounts() {
        this.router.navigateByUrl('/my-linked-accounts');
    }

    myWallet() {
        this.router.navigateByUrl('/my-wallet');
    }

    onPlaidClick(event: any) {
        // console.log('onPlaidClick : ', event);
    }

    onPlaidEvent(event: any) {
        // console.log('onPlaidEvent : ', event);
    }

    onPlaidLoad(event: any) {
        // console.log('onPlaidLoad : ', event);
    }

    onPlaidExit(event: any) {
        // console.log('onPlaidExit : ', event);
    }

    onPlaidSuccess(event: PlaidOnSuccessArgs) {
        console.log('On success');
        console.log(event);
        console.log(event.metadata.institution.name);
        console.log(event.metadata.institution.institution_id);

        this.token = event.token;
        console.log(this.token);

        this.user = {
            // bankAmount:this.bank.deposit_amount,
            handle: this.handle,
            private_key: this.private_key,
            token: this.token
        };

        /*  this.api.linkAccount(this.user).subscribe((response:any)=>{

              console.log(response);
               this.presentAlert(response.message);
          }) */

        this.api.getAccessToken(this.user).subscribe((response: any) => {

            console.log(response);
            // console.log(response.message);


            firebase.database().ref('bank_info').child(this.loginUID).child(event.metadata.institution.institution_id).set({
                institution_name: event.metadata.institution.name,
                institution_id: event.metadata.institution.institution_id,
                token: this.token,
                access_token: response.access_token,
                item_id: response.item_id,
            });
        });


        // this.userSession.setUserDetails(event);
    }

    mylinkedAccount() {
        this.router.navigateByUrl('/connected-account');
    }

    customers(): any {
        // this.router.navigateByUrl('/customers');
        this.router.navigateByUrl('/connected-customers');
    }

    goToAddMoneyToUWallet() {
        this.router.navigateByUrl('/add-money-to-uwallet');
    }

    linkAccount() {
        const browser = this.iab.create('https://plaidpro.herokuapp.com/');
        browser.on('loadstop').subscribe(event => {
            console.log(event);
            console.log(event.url);
            //  browser.insertCSS({ code: "body{color: red;" });
        });


    }


    checkKyc() {

        this.user = {
            // bankAmount:this.bank.deposit_amount,
            handle: this.handle,
            private_key: this.private_key
        };
        console.log(this.user);

        this.api.checkKYC(this.user).subscribe((response: any) => {

            console.log(response);
            this.presentAlert(response.message);
        });

        /*    firebase.database().ref("users").child(this.loginUID).once("value",data=>{

               if(this.request_status=="SUCCESS"){
                    this.presentAlert("Waiting for KYC approval");
               }
               else{
                this.presentAlert("Already request sent");
               }

           }) */
    }

    requestKYC() {


        firebase.database().ref('users').child(this.loginUID).once('value', data => {
            console.log(data.val().bank_data.crypto_id);
            this.private_key = data.val().bank_data.private_key;
            this.full_name = data.val().full_name;
            this.request_status = data.val().request_status;

            if (this.request_status == 'SUCCESS') {
                //  console.log("KAMAL");
                this.presentAlert('Already request sent');
            } else {

                this.user = {
                    full_name: this.full_name,
                    private_key: this.private_key
                };
                this.api.requestKYCUser(this.user).subscribe((response: any) => {
                    console.log(response);
                    if (response.status == 'SUCCESS') {
                        firebase.database().ref('users').child(this.loginUID).update({
                            request_status: response.status
                        });
                        // this.router.navigateByUrl('/home');
                    } else {

                    }

                    console.log(response);
                });

            }

        });


    }

    people() {
        this.router.navigateByUrl('/people');
    }

    transactionHistory() {
        this.router.navigateByUrl('/transaction-history');

    }

    logout() {
        firebase.auth().signOut().then(() => {
            this.router.navigateByUrl('/login');
            localStorage.clear();
        }).catch(function (error) {
            console.log('Error');
        });
    }

    // Show Bank List
    async showBankList() {
        const modal = await this.modalController.create({
            component: BankListModalComponent
        });
        return await modal.present();
    }

    // people
}
