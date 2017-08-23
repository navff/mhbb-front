import { Component, Input, HostListener } from '@angular/core';

@Component({
  selector: 'mh-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.sass'],
})
export class PicturesComponent {
  @Input() pictures: string[];
  num: number;
  show: boolean;

  @HostListener('document:keydown', ['$event'])
  onKeyUp(ev) {
    if (ev.key === 'ArrowRight') { this.next(); }
    if (ev.key === 'ArrowLeft') { this.prev(); }
    if (ev.key === 'Escape') { this.close(); }
  }

  constructor() { }

  open(num?: number) {
    if (this.pictures[num]) {
      this.show = true;
      this.num = num;
    }
  }
  close() {
    this.show = false;
  }
  prev() {
    this.pictures[this.num - 1] ? --this.num : this.num = this.pictures.length - 1;
  }
  next() {
    this.pictures[this.num + 1] ? ++this.num : this.num = 0;
  }
}
