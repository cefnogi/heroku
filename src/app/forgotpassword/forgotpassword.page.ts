import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {
  hideQuestion = false;
  hidePassword = false;
  constructor(public router: Router) { }

  ngOnInit() {
  }
  showQuestion() {
    this.hideQuestion = true;
  }
  showPassword() {
    this.hidePassword = true;
  }
  home() {
    this.router.navigateByUrl('/home');
  }
}
