import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {getDataBaseUrl} from '../shared/endpoint';
import {environment} from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GetStripeServices {
    constructor(private httpClient: HttpClient) {
    }

    baseApi: string = environment.baseApi;
    headers: any = {
        Authorization: 'Bearer ' + localStorage.getItem('token') || ''
    };

    getACHCustomerRequest(payload): Promise<any> {
        const option = {
            headers: this.headers,
        }
        console.log(payload);
        return this.httpClient.post(this.baseApi + getDataBaseUrl.getACHCustomer, payload, option).toPromise();
    }

    getACHCustomerBankAccount(payload): Promise<any> {
        const option = {
            headers: this.headers,
        }
        console.log(payload);
        return this.httpClient.post(this.baseApi + getDataBaseUrl.getACHCustomerBankAccount, payload, option).toPromise();
    }

    getBankAccounts(payload): Promise<any> {
        const option = {
            headers: this.headers,
        }
        console.log(payload);
        return this.httpClient.post(this.baseApi + getDataBaseUrl.getBankAccounts, payload, option).toPromise();
    }

    getPlaidBankAccountTokenRequest(payload): Promise<any> {
        const option = {
            headers: this.headers,
        }
        console.log(payload);
        return this.httpClient.post(this.baseApi + getDataBaseUrl.getPlaidBankAccountToken, payload, option).toPromise();
    }
}
