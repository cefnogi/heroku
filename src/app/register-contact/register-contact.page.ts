import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-contact',
  templateUrl: './register-contact.page.html',
  styleUrls: ['./register-contact.page.scss'],
})
export class RegisterContactPage implements OnInit {
  hideOtp = false;
  hideContact = true;
  constructor(public router: Router) { }

  ngOnInit() {
  }
  login() {
    this.router.navigateByUrl('/login');
  }
  show() {
    this.hideOtp = true;
    this.hideContact = false;
  }
  register() {
    this.router.navigateByUrl('/register');
  }
}
