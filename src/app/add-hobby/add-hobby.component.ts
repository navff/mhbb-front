import { Component, OnInit } from '@angular/core';
import { CityService } from '../shared/city.service';
import { InterestService } from '../shared/interest.service';
// import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
export class TempFilePutBody {
  FormId: string;
  Filename: string;
  Data: any;
  IsMain: boolean;
  constructor (formid: string, name: string, data: any, ismain: boolean) {
    this.FormId = formid;
    this.Filename = name;
    this.Data = data;
    this.IsMain = ismain;
}}

@Component({
  selector: 'my-add-hobby',
  templateUrl: './add-hobby.component.html',
  providers: [InterestService, CityService],
  styleUrls: ['./add-hobby.component.sass']
})
export class AddHobbyComponent implements OnInit {
  cities = [];
  interests = [];

  formId: string;
  isMain: true;
  fileName: string;
  fileData: any;

  constructor(private interestService: InterestService,
              private cityService: CityService) {}

  encodeImage(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
    this.fileData = reader.result;
    console.log(this.fileData);
    };
  }
  fileChange(event) {
    let fileList = event.target.files;

    if (fileList.length > 0) {
      let file: File = fileList[0];
      this.fileName = file.name;
      this.encodeImage(file);

      // let headers = new Headers();
      // headers.append('Content-Type', 'multipart/form-data');
      // headers.append('Accept', 'application/json');
      // headers.append('Authorization', 'Token ABRAKADABRA');
      // let options = new RequestOptions({ headers: headers });
      // let body = new TempFilePutBody(this.formId, this.fileName, file, this.isMain);
      // this.http.post(`http://test.mhbb.ru/b/api/tempfile`, body, options)
      // .map((response) => response.json())
      // .toPromise()
      // .then(result =>  console.log(result));
  }}
  ngOnInit() {
    this.interestService.getInterests().then(result => this.interests = result);
    this.cityService.getCities().then(result => this.cities = result);
  };
}
