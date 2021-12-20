import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {getDataBaseUrl} from '../shared/endpoint';
import {environment} from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FundingServices {
    constructor(private httpClient: HttpClient) {
    }

    baseApi: string = environment.baseApi;
    headers: any = {
        Authorization: 'Bearer ' + localStorage.getItem('token') || ''
    };

    addFunding(user: any, id: any): Promise<any> {
        const option = {
            headers: this.headers
        };
        return this.httpClient.post(this.baseApi + `/customers/${id}` + getDataBaseUrl.addFunding, user, option).toPromise();
    }

    getFundings(id: any): Promise<any> {
        const option = {
            headers: this.headers,
            params: {
                customer_id: id
            }
        };
        return this.httpClient.get(this.baseApi + getDataBaseUrl.getFundings, option).toPromise();
    }

    deleteFunding(id: any): Promise<any> {
        const option = {
            headers: this.headers
        };
        return this.httpClient.post(this.baseApi + `/funding-source/${id}` + getDataBaseUrl.deleteFunding, null, option).toPromise();
    }

    updateFunding(id: any, funding: any): Promise<any> {
        const option = {
            headers: this.headers,
        };
        return this.httpClient.post(this.baseApi + getDataBaseUrl.updateFunding  + `/${id}`, funding, option).toPromise();
    }

    retriveBalance(id: any): Promise<any> {
        const option = {
            headers: this.headers,
        };
        return this.httpClient.get(this.baseApi + `/funding_source/${id}` + getDataBaseUrl.fundingBalance, option).toPromise();
    }

}
