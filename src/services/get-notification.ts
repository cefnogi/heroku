import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {getDataBaseUrl} from '../shared/endpoint';
import {environment} from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GetNotificationServices {
    constructor(private httpClient: HttpClient) {
    }

    baseApi: string = environment.baseApi;
  
    // user_id: string = localStorage.getItem('user_id');

    getNotification(user_id: string): Promise<any> {
        return this.httpClient.get(this.baseApi + getDataBaseUrl.getNotification + '/' + user_id).toPromise();
    }

}
