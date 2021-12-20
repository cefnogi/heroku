import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {HttpClient} from '@angular/common/http';
import { getDataBaseUrl } from '../shared/endpoint';
import {environment} from '../environments/environment';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public fireAuth: any;
  public userProfile: any;
  public apiBaseUrl: string = environment.baseApi;

  constructor(public loadingCtrl: LoadingController, public toastCtrl: ToastController, private alertCtrl: AlertController, private http: HttpClient) {
    this.fireAuth = firebase.auth();
    this.userProfile = firebase.database().ref('users');
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

  login(user: any): Promise<any> {
    // return firebase.auth().signInWithEmailAndPassword(email, password);
    return this.http.post(this.apiBaseUrl + getDataBaseUrl.login, user).toPromise();
  }

  // register(user) {
  //   return firebase.auth()
  //     .createUserWithEmailAndPassword(user.email, user.password).then((authenticatedUser) => {
  //         this.userProfile.child(authenticatedUser.uid).set({
  //         email: user.email,
  //         password: user.password,
  //         full_name: user.name,
  //         uid: authenticatedUser.uid
  //       });
  //     });
  //   }

  register(user): Promise<any> {
      return this.http.post(this.apiBaseUrl + getDataBaseUrl.register, user).toPromise();
  }

    viewUser(userID) {
      return new Promise((resolve, reject) => {
        firebase.database().ref('users').child(userID).once('value', data => {
        });
      });

    }

}
