import {Injectable, OnInit} from '@angular/core';
import {Room} from "./models/Room";
import {Http} from "@angular/http";
import {ConfigService} from "./app.config";

@Injectable()
export class RoomsService {
  rooms: Array<Room> = [];
  constructor(private config: ConfigService, private http: Http) {
    //this.rooms.push(new Room('morgan', 'morgan', 100, 100, 200, 100, true));
  }
  getRooms() {
    if (this.rooms.length > 0) {
      return Promise.resolve(this.rooms);
    } else {
      return this.http.get('api/google/resources').toPromise()
        .then(rooms => rooms.json())
        .then(rooms => {
          this.rooms = rooms
            .filter(room => this.config.rooms[room.name] != undefined)
            .map(room => {
              let newRoom = this.config.rooms[room.name];
              newRoom.id = room.email;
              this.http.post('api/room/' + newRoom.id,
               {timeZone:"EST",preferences:{startDate: new Date(Date.now()), endDate: new Date(Date.now() + 100000) }}).toPromise();
              return newRoom;
            });
          return this.rooms;
      });
    }
  }
}

