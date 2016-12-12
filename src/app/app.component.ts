/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation, OnInit} from '@angular/core';

import { AppState } from './app.service';
import {RoomsService} from "./rooms.service";
import {Room} from "./models/Room";
import {AuthService} from "./auth.service";

/*
 * App Component
 * Top Level Component
 */
@Component({
  moduleId: module.id,
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    'app.component.css'
  ],
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  rooms: Array<Room>;
  signedIn = false;
  constructor(private roomsService: RoomsService, private authService: AuthService) {

  }

  ngOnInit() {
      gapi.load('auth2', function () {
        gapi.auth2.init({client_id: '676353071347-colstnf99gb63t16s7jb60smhis420ja.apps.googleusercontent.com', fetch_basic_profile: false,
          scope: 'https://www.googleapis.com/auth/calendar https://apps-apis.google.com/a/feeds/calendar/resource/ email',
          });
      });
    //this.rooms = this.roomsService.rooms;
  }

  signIn() {
    // gapi.auth.signIn({
    //   clientid: '676353071347-colstnf99gb63t16s7jb60smhis420ja.apps.googleusercontent.com',
    //   scope: 'https://www.googleapis.com/auth/calendar https://apps-apis.google.com/a/feeds/calendar/resource/ https://www.googleapis.com/auth/userinfo.email',
    //   immediate: false,
    //   cookiepolicy: 'single_host_origin',
    //   approvalprompt: 'force',
    //   accesstype: 'offline',
    //   redirecturi: 'postmessage',
    //   callback: (data) => this.authService.authenticate(data).then(()=>this.roomsService.getRooms().then((rooms)=>this.rooms = rooms))
    // });
    gapi.auth2.getAuthInstance().grantOfflineAccess({'redirect_uri': 'postmessage', 'prompt': 'consent'})
      .then((data) => {
        this.authService.authenticate(data).then(()=>this.roomsService.getRooms().then((rooms)=>this.rooms = rooms));
      }, (error) => {
        console.log(error);
      });
  }

}

