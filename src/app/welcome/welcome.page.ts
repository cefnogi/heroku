import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(public router: Router) { 
    

  }

  ngOnInit() {
  }
  login() {
    this.router.navigateByUrl('/login');
  }
  registercontact() {
    this.router.navigateByUrl('/register');
   // this.router.navigateByUrl('/register-contact');
  }
  termOfUse() {
    this.router.navigateByUrl('/terms-of-use');
  }
  privacy_policy() {
    this.router.navigateByUrl('/privacy-policy');
  }
}
