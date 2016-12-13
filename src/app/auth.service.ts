import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {ConfigService} from "./app.config";

@Injectable()
export class AuthService {

    constructor(private config: ConfigService, private http: Http) { }

    authenticate(data) {
      data.redirect_uri = 'postmessage';
      return this.http.post(this.config.reservedApi.baseUrl + this.config.reservedApi.oauthUrl, data).toPromise();
    }

}
