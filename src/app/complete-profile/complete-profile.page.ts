import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {AuthService} from '../auth.service';
import {ApiService} from '../../provider/api.service';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.page.html',
  styleUrls: ['./complete-profile.page.scss'],
})
export class CompleteProfilePage implements OnInit {
 public user: any = {};
 public loginUID: any;
  constructor(public router: Router, public authService: AuthService, public api: ApiService, public loadingController: LoadingController) {
    const email = localStorage.getItem('email');
    const fullName = localStorage.getItem('full_name');
    if (email) {
      this.user.email = email;
    }
    if (fullName) {
      this.user.full_name = fullName;
    }
    // this.loginUID=localStorage.getItem("loginUID");
    //  console.log(this.loginUID);
    //     firebase.database().ref("users").child(this.loginUID).once("value",data=>{
    //         this.presentLoading("Loading data")
    //         console.log(data.val());
    //         this.user.full_name=data.val().full_name;
    //         this.user.email=data.val().email;
    //     })
      }

  ngOnInit() {
  }
async presentLoading(msg) {
    const loading = await this.loadingController.create({
      message: msg,
      duration: 1500
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }
  login() {
    this.router.navigateByUrl('/login');
  }
  home() {
    this.router.navigateByUrl('/home');
  }

  register_temp() {
  console.log(this.user);

  if (this.user.full_name == null || this.user.full_name === '') {
      this.authService.Toast('Please enter your full name');
    } else if (this.user.first_name == null || this.user.first_name === '') {
      this.authService.Toast('Please enter first name');
    } else if (this.user.last_name == null || this.user.last_name === '') {
      this.authService.Toast('Please enter last name');
    } else if (this.user.type == null || this.user.type === '') {
      this.authService.Toast('Please choose Account type');
    } else if (this.user.email == null || this.user.email === '') {
      this.authService.Toast('Please enter  email');
    } else if (this.emailIsValid() !== true) {
      this.authService.Toast('Please enter a valid email!');
    } else if (this.user.address == null || this.user.address === '') {
      this.authService.Toast('Please enter address');
    } else if (this.user.address2 == null || this.user.address2 === '') {
      this.authService.Toast('Please enter address2');
    } else if (this.user.city == null || this.user.city === '') {
      this.authService.Toast('Please enter city');
    } else if (this.user.state == null || this.user.state === '') {
      this.authService.Toast('Please enter state');
    } else if (this.user.zipcode == null || this.user.zipcode === '') {
      this.authService.Toast('Please enter zipcode');
    } else if (this.user.phone == null || this.user.phone === '') {
      this.authService.Toast('Please enter phone');
    } else if (this.user.dob == null || this.user.dob === '') {
      this.authService.Toast('Please enter last dob');
    } else if (this.user.ssn == null || this.user.ssn === '') {
      this.authService.Toast('Please enter ssn');
    } else {

      this.api.registerDowllaUser(this.user).subscribe((response: any) => {
          console.log(response);
          this.user.dwolla_customer_url = response.url;
          if (response.success) {
            firebase.database().ref('users').child(this.loginUID).update(this.user).then(data => {
              this.presentLoading('Loading data');
              this.router.navigateByUrl('/home');
        });
          } else {
            console.log(response.err.body._embedded.errors[0].message);
            this.authService.Toast(response.err.body._embedded.errors[0].message);
            console.log( response.body._embedded.errors[0].message);
            this.authService.Toast('There is issue with creating account');
          }

      });

    }

  }

  register() {
    if (this.user.name == null || this.user.name === '') {
      this.authService.Toast('Please enter your name');
    } else if (this.user.email == null || this.user.email === '') {
      this.authService.Toast('Please enter email id');
    } else if (this.emailIsValid() !== true) {
      this.authService.Toast('Please enter a valid email!');
    } else if (this.user.password == null || this.user.password === '') {
      this.authService.Toast('Please set your password');
    } else if (this.user.cpassword == null || this.user.cpassword === '') {
      this.authService.Toast('Please set your confirm password');
    } else if (this.user.password != this.user.cpassword) {
      this.authService.Toast('Password is not Matching');
    } else if (this.user.password.length < 6) {
      this.authService.Toast('Password must be minimum of 6 characters');
    } else {
      const base = this;
      // this.authService.LoaderShow1('Logging you in...')
      this.authService.register(this.user).then(() => {
        localStorage.setItem('logintype', 'normal');
        // this.authService.LoaderHide();
        const user = firebase.auth().currentUser;
        localStorage.setItem('loginUID', user.uid);
       // this.router.navigateByUrl('/dashboard');
        this.router.navigateByUrl('/home');
      }).catch(function(error) {
        base.authService.Toast(error);
        console.log('Error');
      });
    // }
      console.log(this.user);
    }


  }

  emailIsValid(this: any) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.user.email);
  }

}
