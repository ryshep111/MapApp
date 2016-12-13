import {Component, ElementRef, HostListener, Input, Renderer, OnChanges} from '@angular/core';
import {Room} from "./models/Room";
@Component({
  selector: '[roomImage]',
  template: `<svg:defs>
    <svg:pattern id="image" patternUnits="userSpaceOnUse" height="100%" width="100%">
      <svg:image [attr.xlink:href]="url" height="100%" width="100%"></svg:image>
    </svg:pattern>
  </svg:defs>
  <svg:circle id = "sd" class = "medium" cx = "50%" cy = "40%" r = "20%" stroke = "lightblue" stroke-width = "0.5%" fill="url(#image)"/>
  `
})
export class RoomComponent implements OnChanges {
  @Input() room : Room;
  x;
  y;
  url;
  height;
  width = 100;
  constructor() {

  }

  ngOnChanges(): void {
    this.x = this.room.x;
    this.y = this.room.y;
    this.url = 'assets/images/' + this.room.name + '/' + this.room.name + '-1.jpg';
  }
}


