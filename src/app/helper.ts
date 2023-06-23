import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})


export class Helper {
    private BACKEND_SERVER_URL: string = environment.base_url;

    constructor(private http: HttpClient, public router: Router) {

    }


    httpMethodRequester(method: string, api_name: string, parameter: object, success_message: boolean, error_message: boolean, response: any) {

        if (method !== "GET") {
            this.sendPostRequest(api_name, parameter).subscribe((res_data: any) => {
                console.log(res_data);
                response(res_data);
            })
        } else {
            this.sendGetRequest(api_name).subscribe((res_data: any) => {
                console.log(res_data);
                response(res_data);
            })
        }
    }

    private handleError = (error: any) => {
        console.log(error)
    }

    sendGetRequest(url: string,) {
        return this.http.get(
            this.BACKEND_SERVER_URL + url,
        );
    }

    sendPostRequest(url: string, request_data: any) {
        return this.http.post(
            this.BACKEND_SERVER_URL + url,
            request_data,
        );
    }
}