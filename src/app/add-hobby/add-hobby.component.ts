import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ListService } from './../shared/services/list.service';
import { ActivityService } from '../shared/services/activity.service';
import { OrganizerService } from '../shared/services/organizer.service';
import { Activity } from '../models/activity.model';
import { TempFile } from '../models/tempfile.model';
import { Router } from '@angular/router';

@Component({
  templateUrl: './add-hobby.component.html',
  providers: [ListService, ActivityService, OrganizerService],
  styleUrls: ['./add-hobby.component.sass']
})
export class AddHobbyComponent implements OnInit {
  interests: any[];
  cities: any[];
  organizers: any[];
  organizerId: any;
  fileNames: string[] = [];
  fileData: string[] = [];
  fileId: string[] = [];
  formId: any;

  isChecked: boolean;
  responding: boolean;
  isOrganizerChosen: boolean;

  addHobby: FormGroup;

  constructor(
    private listService: ListService,
    private organizerService: OrganizerService,
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
  filterOrganizers(value) {
    if (this.isOrganizerChosen) {
      this.isOrganizerChosen = false;
      this.addHobby.controls['cityId'].setValue('');
      this.addHobby.controls['sobriety'].setValue(false);
      this.addHobby.controls['cityId'].enable();
      this.addHobby.controls['sobriety'].enable();
    }
    this.organizerService.getOrganizers('1', value).subscribe(data => this.organizers = data);
  }
  setOrganizer(id: string) {
    this.isOrganizerChosen = true;
    document.getElementById('organizerInput').blur();
    this.organizerId = id;
    this.addHobby.controls['cityId'].disable();
    this.addHobby.controls['sobriety'].disable();
    this.organizerService.getOrganizerById(id).subscribe(data => {
      this.addHobby.controls['cityId'].setValue(data.CityId);
      this.addHobby.controls['sobriety'].setValue(data.Sobriety);
    });
  }
  showOrganizers() {
    this.organizerService.getOrganizers('1').subscribe(data => this.organizers = data);
  }
  submitForm() {
    this.responding = true;
    let organizer = {
      Name: this.addHobby.get('organizerName').value,
      CityId: this.addHobby.get('cityId').value,
      Sobriety: this.addHobby.get('sobriety').value
    };
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
      this.isOrganizerChosen ? null : organizer,
      this.isOrganizerChosen ? this.organizerId : null
    );
    this.activityService.postActivity(body)
      .subscribe(() => {
        this.router.url === '/admin/addhobby' ?
          this.router.navigate(['/admin/addhobby/success']) :
          this.router.navigate(['/addhobby/success']);
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
    this.activityService.deleteTempfile(this.fileId[index]).subscribe();
  }
  ngOnInit() {
    this.listService.getInterests().subscribe(data => this.interests = data);
    this.listService.getCities().subscribe(data => this.cities = data);
    this.organizerService.getOrganizers('1').subscribe(res => this.organizers = res);
  }
}
