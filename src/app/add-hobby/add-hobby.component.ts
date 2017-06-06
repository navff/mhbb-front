import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'my-add-hobby',
  templateUrl: './add-hobby.component.html',
  styleUrls: ['./add-hobby.component.sass']
})
export class AddHobbyComponent {

  constructor(private http: Http) {}

  fileChange(event) {
    let fileList = event.target.files;

    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      let headers = new Headers();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      let options = new RequestOptions({ headers: headers });
      this.http.post(`somwhere`, formData, options)
      .map((response) => response.json())
      .toPromise()
      .then(result =>  console.log(result));
  }
}
}
