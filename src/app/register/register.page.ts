import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public user: any = {};
  constructor(public router: Router, public authService: AuthService) { }

  ngOnInit() {
  }
  login() {
    this.router.navigateByUrl('/login');
  }
  home() {
    this.router.navigateByUrl('/home');
  }

  register_temp() {
    //   this.router.navigateByUrl('/home');
    this.router.navigateByUrl('/complete-profile');
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
      const payload = {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
        c_password: this.user.cpassword
      };
      // this.authService.LoaderShow1('Logging you in...')
      this.authService.register(payload).then((data) => {
        localStorage.setItem('logintype', 'normal');
        if (data) {
          const token = data.access_token;
          localStorage.setItem('token', token);
          localStorage.setItem('refresh_token', data.refresh_token);
          localStorage.setItem('full_name', this.user.name);
          localStorage.setItem('email', this.user.email);
        }
        // this.authService.LoaderHide();
        // const user = firebase.auth().currentUser;
        // localStorage.setItem('loginUID', user.uid);
       // this.router.navigateByUrl('/dashboard');
  //  this.router.navigateByUrl('/home');
        this.router.navigateByUrl('/complete-profile');
      }).catch((error) => {
        base.authService.Toast(error.message);
      });
    // }
      console.log(this.user);
    }
  }

  emailIsValid(this: any) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.user.email);
  }


  registerUser() {

    console.log(this.user);

  }

}
