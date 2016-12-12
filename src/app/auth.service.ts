import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

    constructor(private http: Http) { }

    authenticate(data) {
      data.redirect_uri = 'postmessage';
      return this.http.post('api/auth/google', data).toPromise();
    }

}
