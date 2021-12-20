import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class BasicService {
    constructor(private loadingController: LoadingController) {
    }

    async showLoding(msg = 'Loading...'): Promise<any> {
        const loading = await this.loadingController.create({
            message: msg,
        });
        return await loading.present();
    }

    async hideLoading(): Promise<any> {
        return await this.loadingController.dismiss();
    }

}
