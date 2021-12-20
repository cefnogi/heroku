import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getDataBaseUrl } from '../shared/endpoint';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TransferMoney {
    constructor(private httpClient: HttpClient) {
    }

    baseApi: string = environment.baseApi;
    headers: any = {
        Authorization: 'Bearer ' + localStorage.getItem('token') || ''
    };

    getBalanceCheck(): Promise<any> {
        const option = {
            headers: this.headers
        };
        return this.httpClient.get(this.baseApi + getDataBaseUrl.balanceCheck, option).toPromise();
    }

    getAllCustomers(): Promise<any> {
        const params: any = {
            limit: 10,
            user_id: localStorage.getItem('user_id'),
        }
        const option: any = {
            headers: this.headers,
            params
        };
        return this.httpClient.get(this.baseApi + getDataBaseUrl.getAllConnectedCustomers, option).toPromise();
    }

    getAllUsers(): Promise<any> {
        const params: any = {
            limit: 10
        }
        const option: any = {
            headers: this.headers,
            params
        };
        return this.httpClient.get(this.baseApi + getDataBaseUrl.getAllConnectedUsers).toPromise();
    }

    addingFund(data: any): Promise<any> {
        const params: any = {
            amount: data.amount,
            currency: 'usd',
            description: 'journey',
            statement_descriptor: 'Top-up'
        }
        const option: any = {
            headers: this.headers,
            params
        };
        return this.httpClient.post(this.baseApi + getDataBaseUrl.addFund, null ,option).toPromise();        
    }

    tranferingFund(data: any):Promise<any> {
        const params: any = {
            destination: data.id,
            amount: data.amount,
            user_id: data.user_id,
            currency: 'usd',
            transfer_group: 'ORDER_96'
        }
        const option: any = {
            headers: this.headers,
            params
        };
        return this.httpClient.post(this.baseApi + getDataBaseUrl.tranferFund, null ,option).toPromise();  
    }

    payingOutFund(data: any): Promise<any> {
        const params: any = {
            amount: data.amount,
            currency: 'usd',
        }
        const option: any = {
            headers: this.headers,
            params
        };
        return this.httpClient.post(this.baseApi + getDataBaseUrl.payingoutFund, null ,option).toPromise();   
    }
}
