import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CityService } from '../shared/services/city.service';
import { InterestService } from '../shared/services/interest.service';
import { ActivityService } from '../shared/services/activity.service';
import { Activity } from '../models/activity.model';
import { TempFile } from '../models/tempfile.model';
import { Router } from '@angular/router';

@Component({
  selector: 'mh-add-hobby',
  templateUrl: './add-hobby.component.html',
  providers: [InterestService, CityService, ActivityService],
  styleUrls: ['./add-hobby.component.sass']
})
export class AddHobbyComponent implements OnInit {
  cities = [];
  interests = [];

  fileNames = [];
  fileData = [];
  fileId = [];
  formId: any;
  isChecked = false;
  responding = false;
  addHobby: FormGroup;

  constructor(private interestService: InterestService,
    private cityService: CityService,
    fb: FormBuilder,
    private activityService: ActivityService,
    private router: Router
  ) {
    this.addHobby = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      'organizerName': ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      'cityId': ['', Validators.required],
      'ageFrom': ['', Validators.required],
      'ageTo': ['', Validators.required],
      'interestId': ['', Validators.required],
      'phones': ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      'address': ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      'prices': ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      'mentor': ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      'description': ['', Validators.compose([Validators.required, Validators.maxLength(1000)])],
      'free': [false, Validators.required],
      'sobriety': [false, Validators.required],
      'image0': ['', Validators.required],
      'image1': '',
      'image2': '',
      'image3': ''
    });
  }
  submitForm() {
    this.responding = true;

    let body = new Activity(
      this.addHobby.get('name').value,
      +this.addHobby.get('ageFrom').value,
      +this.addHobby.get('ageTo').value,
      this.addHobby.get('phones').value,
      this.addHobby.get('address').value,
      this.addHobby.get('prices').value,
      this.addHobby.get('mentor').value,
      this.addHobby.get('description').value,
      this.addHobby.get('interestId').value,
      this.isChecked,
      this.addHobby.get('free').value,
      this.formId,
      {
        Name: this.addHobby.get('organizerName').value,
        CityId: this.addHobby.get('cityId').value,
        Sobriety: this.addHobby.get('sobriety').value
      },
    );
    this.activityService.postActivity(body)
      .subscribe(() => {
        this.router.url === '/admin/addhobby' ? this.router.navigate(['/admin/addhobby/success'])
                                              : this.router.navigate(['/addhobby/success']);
        this.responding = false;
      });
  }

  addImage(event, index, isMain) {
    let data, body, file: File;
    file = event.target.files[0];

    if (!this.formId) {
      this.formId = Date.now().toString(10);
    }
    this.fileNames[index] = file.name;
    this.addHobby.controls[`image${index}`].setValue(file.name);

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.fileData[index] = reader.result;
      data = this.fileData[index].replace(/^data:image\/[a-z]+;base64,/, '');
      body = new TempFile(this.formId, this.fileNames[index], data, isMain);
      this.activityService.postTempFile(body)
        .subscribe(res => {
          this.fileId[index] = res.Id;
        });
    };
  }

  removeImage(index) {
    (<HTMLScriptElement>document.getElementById(`input-${index}`))['value'] = null;
    this.fileNames[index] = null;
    this.addHobby.controls[`image${index}`].setValue('');
    this.fileData[index] = null;
    this.activityService.deleteTempfile(this.fileId[index]);
  }
  ngOnInit() {
    this.interestService.getInterests().subscribe(data => this.interests = data);
    this.cityService.getCities().subscribe(data => this.cities = data);
  }
}
