import {Injectable, OnInit} from '@angular/core';
import {Room} from "./models/Room";
import {Http} from "@angular/http";

@Injectable()
export class RoomsService {
rooms: Array<Room> = [];
    constructor(private http: Http) {
      //this.rooms.push(new Room('morgan', 'morgan', 100, 100, 200, 100, true));
    }
    getRooms() {
      if (this.rooms.length > 0) {
        return Promise.resolve(this.rooms);
      } else {
        return this.http.get('api/google/resources').toPromise().then(rooms => {
          this.rooms = rooms.json();
          return this.rooms
        });
      }
    }
}

/*this.http.post('api/room/pointsourcellc.com_2d313331323531322d333830@resource.calendar.google.com',
 {"timeZone":"EST","preferences":{"startDate":"2016-12-12T12:00:00.000Z","endDate":"2016-12-13T00:00:00.000Z"}})*/
