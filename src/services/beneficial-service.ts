import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {getDataBaseUrl} from '../shared/endpoint';
import {environment} from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BeneficialServices {
    constructor(private httpClient: HttpClient) {
    }

    baseApi: string = environment.baseApi;
    headers: any = {
        Authorization: 'Bearer ' + localStorage.getItem('token') || ''
    };

    addBenificialOwner(user, id): Promise<any> {
        const option = {
            headers: this.headers,
        };
        return this.httpClient.post(this.baseApi + getDataBaseUrl.addBenificial + `/${id}`, user, option).toPromise();
    }

    getBenificialLists(id): Promise<any> {
        const option = {
            headers: this.headers,
        };
        return this.httpClient.get(this.baseApi + getDataBaseUrl.getBenificial + '/' + id, option).toPromise();
    }

    updateBenificialOwner(user, id): Promise<any> {
        const option = {
            headers: this.headers,
        };
        return this.httpClient.post(this.baseApi + getDataBaseUrl.updateBenificial + `/${id}`, user, option).toPromise();
    }

    checkStatus(id: any): Promise<any> {
        const option = {
            headers: this.headers,
        };
        return this.httpClient.get(this.baseApi + getDataBaseUrl.checkBenificialStatus + `/${id}`, option).toPromise();
    }

    checkCertify(id: any): Promise<any> {
        const option = {
            headers: this.headers,
        };
        return this.httpClient.post(this.baseApi + `/customer/${id}` + getDataBaseUrl.checkBenificialCertify, {status: 'certified'}, option).toPromise();
    }

    deleteBenificialOwner(id): Promise<any> {
        const option = {
            headers: this.headers,
        };
        return this.httpClient.post(this.baseApi + getDataBaseUrl.deleteBeneficial + `/${id}`, null, option).toPromise();
    }
}
