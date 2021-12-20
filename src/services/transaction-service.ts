import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getDataBaseUrl } from '../shared/endpoint';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {
    constructor(private httpClient: HttpClient) {
    }

    baseApi: string = environment.baseApi;
    headers: any = {
        Authorization: 'Bearer ' + localStorage.getItem('token') || ''
    };


    getAlltransaction(): Promise<any> {
        const params: any = {
            limit: 3,
            user_id: localStorage.getItem('user_id'),
        }
        const option: any = {
            headers: this.headers,
            params
        };
        return this.httpClient.post(this.baseApi + getDataBaseUrl.getTransactionsAll, null, option).toPromise();
    }

    getPerticularHistory(id): Promise<any> {
        const option: any = {
            headers: this.headers,
        };
        return this.httpClient.get(this.baseApi + getDataBaseUrl.getTransactionsPerticular + `/${id}`, option).toPromise();
    }

    getAccountDetail(id): Promise<any> {
        const option: any = {
            headers: this.headers,
        };
        return this.httpClient.get(this.baseApi + getDataBaseUrl.fetchAccDetail + `/${id}`, option).toPromise();
    }

    getAllTransactionHistory(): Promise<any> {
        const params: any = {
            user_id: localStorage.getItem('user_id'),
        }
        const option: any = {
            headers: this.headers,
            params
        };
        return this.httpClient.post(this.baseApi + getDataBaseUrl.getAllTransactionHistory, null, option).toPromise();
    }

}
