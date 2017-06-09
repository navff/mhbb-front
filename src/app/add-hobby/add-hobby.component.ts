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
  counter = 0;

  fileNames = [];
  fileData = [];
  formId: any;

  constructor(private interestService: InterestService,
              private cityService: CityService,
              // private activityService: ActivityService
              ) {}

  fileChange(event, index, isMain) {
      this.counter += 1;
      let data, body, file: File;
      file = event.target.files[0];
      if (!this.formId) {
        this.formId = Date.now().toString(10);
      }
      this.fileNames[index] = file.name;

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.fileData[index] = reader.result;
        data = this.fileData[index].replace(/^data:image\/[a-z]+;base64,/, '');
        body = new TempFilePutBody(this.formId, this.fileNames[index], data, isMain);
        console.log(body);
      //   this.activityService.postTempFile(body)
      //  .then(result =>  console.log(result));
      };
  }
  removeImage(index) {
    (<HTMLScriptElement>document.getElementById(`input-${index}`))["value"] = null
    this.fileNames[index] = null;
    this.fileData[index] = null;
  }
  ngOnInit() {
    this.interestService.getInterests().then(result => this.interests = result);
    this.cityService.getCities().then(result => this.cities = result);
  };
}
