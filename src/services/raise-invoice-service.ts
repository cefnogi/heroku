import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {getDataBaseUrl} from '../shared/endpoint';
import {environment} from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RaiseInvoiceServices {
    constructor(private httpClient: HttpClient) {
    }

    baseApi: string = environment.baseApi;
    headers: any = {
        Authorization: 'Bearer ' + localStorage.getItem('token') || ''
    };

    raiseInvoice(payload): Promise<any> {
        const option = {
            headers: this.headers,
        };
        console.log(payload);
        return this.httpClient.post(this.baseApi + getDataBaseUrl.raiseInvoice, payload, option).toPromise();
    }

    raiseRequest(payload): Promise<any> {
        const option = {
            headers: this.headers,
        };
        console.log(payload);
        return this.httpClient.post(this.baseApi + getDataBaseUrl.raiseRequest, payload, option).toPromise();
    }

}
