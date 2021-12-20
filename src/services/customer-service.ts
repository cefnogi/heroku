import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {getDataBaseUrl} from '../shared/endpoint';
import {environment} from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CustomerServices {
    constructor(private httpClient: HttpClient) {
    }

    baseApi: string = environment.baseApi;
    headers: any = {
        Authorization: 'Bearer ' + localStorage.getItem('token') || ''
    };

    addVerifiedCustomer(user): Promise<any> {
        const option = {
            headers: this.headers
        };
        return this.httpClient.post(this.baseApi + getDataBaseUrl.addVerifiedCustomer, user, option).toPromise();
    }

    addUnVerifiedCustomer(user): Promise<any> {
        const option = {
            headers: this.headers
        };
        return this.httpClient.post(this.baseApi + getDataBaseUrl.addUnVerifiedCustomer, user, option).toPromise();
    }

    getCustomersList(): Promise<any> {
        const option = {
            headers: this.headers
        };
        return this.httpClient.get(this.baseApi + getDataBaseUrl.customers, option).toPromise();
    }
    updateCustomer(user, id): Promise<any> {
        const option = {
            headers: this.headers,
        };
        return this.httpClient.post(this.baseApi + getDataBaseUrl.updateCustomer + `/${id}`, user, option).toPromise();
    }

    deleteCustomer(id): Promise<any> {
        const option = {
            headers: this.headers,
        };
        return this.httpClient.post(this.baseApi + getDataBaseUrl.deleteBeneficial + `/${id}`, null, option).toPromise();
    }

    addConnectedCustomers(payload, type, customerId = null): Promise<any> {
        const option = {
            headers: this.headers,
        };
        console.log(payload);
        if(!type) {
            return this.httpClient.post(this.baseApi + getDataBaseUrl.createConnectedAccount , payload, option).toPromise();
        } else {
            return this.httpClient.post(this.baseApi + getDataBaseUrl.createConnectedAccount + `/${customerId}` , payload, option).toPromise();
        }
    }

    sendingFrontFile(file): Promise<any> {
        const option = {
            headers: this.headers,
        };
        return this.httpClient.post(this.baseApi + getDataBaseUrl.frontFileUpload , file, option).toPromise();
    }

}
