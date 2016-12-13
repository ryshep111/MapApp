/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation, OnInit, ChangeDetectorRef} from '@angular/core';

import { AppState } from './app.service';
import {RoomsService} from "./rooms.service";
import {Room} from "./models/Room";
import {AuthService} from "./auth.service";
import {ConfigService} from "./app.config";

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
  constructor(private config: ConfigService, private roomsService: RoomsService, private authService: AuthService, private cd: ChangeDetectorRef) {

  }

  ngOnInit() {
    let config = this.config;
    gapi.load('auth2', function () {
      gapi.auth2.init({client_id: config.reservedApi.clientId, fetch_basic_profile: false,
        scope: config.reservedApi.scopes,
      });
    });
    //this.rooms = this.roomsService.rooms;
  }

  signIn() {
    gapi.auth2.getAuthInstance().grantOfflineAccess({'redirect_uri': 'postmessage', 'prompt': 'consent'})
      .then((data) => {
        this.authService.authenticate(data)
          .then(()=>this.roomsService.getRooms()
            .then((rooms)=> {
              this.rooms = rooms;
              this.cd.detectChanges();
            })
          );
      }, (error) => {
        console.log(error);
      });
  }

}

