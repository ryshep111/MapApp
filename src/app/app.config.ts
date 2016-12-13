import { Injectable } from '@angular/core';
import {Room} from "./models/Room";

type ReservedApi = {
  baseUrl?,
  oauthUrl,
  scopes,
  clientId
};
@Injectable()
export class ConfigService {
  reservedApi: ReservedApi = {
    oauthUrl: 'api/auth/google',
    scopes: 'https://www.googleapis.com/auth/calendar https://apps-apis.google.com/a/feeds/calendar/resource/ email',
    clientId: '676353071347-colstnf99gb63t16s7jb60smhis420ja.apps.googleusercontent.com'
  };

  rooms = {
    'NC-MORGAN-4-S.Atrium': {x: 50, y: 40, name: 'morgan'}
  };

  constructor() {
    switch(ENV) {
      case 'production':
        break;
      default:
        this.reservedApi.baseUrl = ''
    }
  }

}
