import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mh-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.sass'],
})
export class UploadComponent {
  @Input() url: string;
  @Output() success: EventEmitter<{data: any, name: string}> = new EventEmitter();
  @Output() remove = new EventEmitter();
  constructor() {}

  upload(event) {
    let file: File = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      let data = reader.result.replace(/^data:image\/[a-z]+;base64,/, '');
      this.success.emit({data, name: file.name});
    };
  }

  clear() {
    (<HTMLScriptElement> document.getElementById('input'))['value'] = null;
    this.remove.emit();
  }
}
