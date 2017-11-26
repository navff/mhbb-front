import { Component } from '@angular/core';

@Component({
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.sass'],
})
export class StaticComponent {
  page: string;
  constructor() {
    this.page =  location.pathname.substr(location.pathname.match('admin') ? 7 : 1);
  }

  back() {
    history.back();
  }
}
