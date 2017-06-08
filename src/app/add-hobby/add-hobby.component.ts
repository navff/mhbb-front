import { Component, OnInit } from '@angular/core';
import { CityService } from '../shared/city.service';
import { InterestService } from '../shared/interest.service';
import { ActivityService, TempFilePutBody } from '../shared/activity.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'my-add-hobby',
  templateUrl: './add-hobby.component.html',
  providers: [InterestService, CityService, ActivityService],
  styleUrls: ['./add-hobby.component.sass']
})
export class AddHobbyComponent implements OnInit {
  cities = [];
  interests = [];

  formId: string;
  isMain: boolean;
  fileName: string;
  fileData: string;

  constructor(private interestService: InterestService,
              private cityService: CityService,
              // private activityService: ActivityService
              ) {}

  encodeImage(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.fileData = reader.result;
    };
  }
  fileChange(event) {
    let fileList = event.target.files;

    if (fileList.length > 0) {
      let file: File = fileList[0], data, body;
      this.fileName = file.name;
      this.encodeImage(file);
      setTimeout(() => {
        data = this.fileData.replace(/^data:image\/[a-z]+;base64,/, '');
        body = new TempFilePutBody('1', this.fileName, data, true);
      //   this.activityService.postTempFile(body)
      //  .then(result =>  console.log(result));
      }, 3000);


  }}
  ngOnInit() {
    this.interestService.getInterests().then(result => this.interests = result);
    this.cityService.getCities().then(result => this.cities = result);
  };
}
