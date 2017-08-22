import { Component, Input } from '@angular/core';

@Component({
  selector: 'mh-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.sass'],
})
export class PicturesComponent {
  @Input() pictures: string[];
  number: number;
  pictureShow: boolean;

  constructor() { }

  toggle(number?: number) {
    console.log('toggled');
    this.pictureShow = (this.pictureShow && this.number === number) ? false : true;
    this.number = number;
  }
}
