import { Component, Input } from '@angular/core';

@Component({
  selector: 'mh-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.sass'],
})
export class ImageUploadComponent {
  @Input() image: any;

  constructor() { }

}
