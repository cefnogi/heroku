import { ComponentsModule } from './components/components.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Stripe } from '@ionic-native/stripe/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { NgxPlaidLinkModule } from 'ngx-plaid-link';
import { FindUserListComponent } from './find-user-list/find-user-list.component';
import { FindUserPage } from './find-user/find-user.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { BankListModalComponent } from './bank-list-modal/bank-list-modal.component';
import { BankListModalComponent } from './components/bank-list-modal/bank-list-modal.component';
import { EditInvoiceDateAndNumberComponent } from './edit-invoice-date-and-number/edit-invoice-date-and-number.component';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

const firebaseConfig = {
  // apiKey: "AIzaSyDTM75T4KXJEXGfBIBezb-QDPGnVarqwWQ",
  // authDomain: "ugocashpro.firebaseapp.com",
  // databaseURL: "https://ugocashpro.firebaseio.com",
  // projectId: "ugocashpro",
  // storageBucket: "ugocashpro.appspot.com",
  // messagingSenderId: "134395733772",
  // appId: "1:134395733772:web:c4f0d72d71f8a35a644b29"
  apiKey: 'AIzaSyCeS92XuD4ujP8pCXyBfshae5a7zYSW9mA',
  authDomain: 'ugocashplaid.firebaseapp.com',
  databaseURL: 'https://ugocashplaid-default-rtdb.firebaseio.com/',
  projectId: 'ugocashplaid',
  storageBucket: 'ugocashplaid.appspot.com',
  messagingSenderId: '239528723174',
  appId: '1:239528723174:web:43dfdba4d879e705987127'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [AppComponent, FindUserListComponent, BankListModalComponent, EditInvoiceDateAndNumberComponent],
  entryComponents: [FindUserListComponent, BankListModalComponent, EditInvoiceDateAndNumberComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, NgxPlaidLinkModule, ReactiveFormsModule, FormsModule],
  providers: [
   InAppBrowser,
   Stripe,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Clipboard,
    { 
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy 
    },
    File,
    FileOpener,
    LocalNotifications,
    Ng2SearchPipeModule,
    ComponentsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
