import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {LoadingController} from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    public user: any = {};
    user_id: string = '';
    constructor(public router: Router, 
        public authService: AuthService, 
        public loadingController: LoadingController
        ) {

    }

    ngOnInit() {
    }

    async presentLoading(msg) {
        const loading = await this.loadingController.create({
            message: msg,
            duration: 1500
        });
        await loading.present();

        const {role, data} = await loading.onDidDismiss();

        console.log('Loading dismissed!');
    }

    login() {
        const base = this;
        if (this.user.email != null && this.user.password != null && this.user.email != '' && this.user.password != '') {
            const payload = {
                email: this.user.email,
                password: this.user.password
            };

            this.authService.login(payload).then(authData => {
                // localStorage.setItem('loginUID', authData.uid);
                console.log(authData);
                if(authData) {
                    localStorage.setItem('token', authData.access_token);
                    localStorage.setItem('refresh_token', authData.refresh_token);
                    localStorage.setItem('user_email', authData['response'].email);
                    localStorage.setItem('user_name', authData['response'].name);
                    localStorage.setItem('user_id', authData['response'].user_id);
                    this.user_id = authData['response'].user_id;
                }
                base.authService.Toast('Successfully Logged i4n!');
                base.presentLoading('Logging you in...');
                this.router.navigateByUrl('/home');
            }).catch((error) => {
                base.authService.Toast(error.message);
                // const errorCode = error.code;
                //
                // if (error.code === 'auth/wrong-password') {
                //     base.authService.Toast('These credentials do not match');
                // } else if (error.code === 'auth/user-not-found') {
                //     base.authService.Toast('User not found');
                // } else if (error.code === 'auth/invalid-email') {
                //     base.authService.Toast('Invalid email');
                // } else if (error.code === 'auth/user-disabled') {
                //     base.authService.Toast('You are disabled by admin');
                // }
            });
        } else {
            base.authService.Toast('Please fill all fields');
        }
    }

    register() {
        this.router.navigateByUrl('/register');
    }

    forgotpassword() {
        this.router.navigateByUrl('/forgotpassword');
    }

    home() {
        this.router.navigateByUrl('/home');
    }

    showNotification() {
        
    }
}
