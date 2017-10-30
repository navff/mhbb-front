import { Component } from '@angular/core';

@Component({
  selector: 'mh-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.sass'],
})
export class StaticComponent {
  path: string;
  constructor() {
    this.path = location.pathname;
  }

  back() {
    history.back();
  }
}
