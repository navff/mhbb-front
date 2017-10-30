import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { InterestService } from '../../../shared/services/interest.service';
import { OrganizerService } from './../../../shared/services/organizer.service';
import { ActivityService } from '../../../shared/services/activity.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from '../../../models/activity.model';
import { TempFile } from '../../../models/tempfile.model';

@Component({
  selector: 'mh-admin-act-edit',
  templateUrl: './admin-act-edit.component.html',
  providers: [InterestService, ActivityService, OrganizerService],
  styleUrls: ['./admin-act-edit.component.sass']
})
export class AdminActEditComponent implements OnInit {
  activityId: string;
  picUrls = [];
  interests = [];
  fileNames = [];
  fileData = [];
  tempfileId = [];
  formId: any = null;
  isChecked: boolean;
  organizerId: number;
  organizerName: string;
  organizers = [];
  responding: string;
  editHobby: FormGroup;

  picId = [];
  picsToDelete: boolean[] = [];

  constructor(
    private interestService: InterestService,
    fb: FormBuilder,
    private organizerService: OrganizerService,
    private activityService: ActivityService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editHobby = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      'organizer': ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      'ageFrom': ['', Validators.required],
      'ageTo': ['', Validators.required],
      'interestId': ['', Validators.required],
      'phones': ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      'address': ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      'prices': ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      'mentor': ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      'description': ['', Validators.compose([Validators.required, Validators.maxLength(1000)])],
      'free': [false, Validators.required],
      'image0': ['', Validators.required],
      'image1': '',
      'image2': '',
      'image3': ''
    });
  }
  filterOrganizers(value) {
    this.organizerService.getOrganizers('1', value).subscribe(data => this.organizers = data);
  }
  setOrganizerId(id) {
    this.organizerId = id;
  }
  addImage(event, index, isMain) {
    let data, body, file: File;
    file = event.target.files[0];

    if (!this.formId) {
      this.formId = Date.now().toString(10);
    }
    this.fileNames[index] = file.name;
    this.editHobby.controls[`image${index}`].setValue(file.name);

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.fileData[index] = reader.result;
      data = this.fileData[index].replace(/^data:image\/[a-z]+;base64,/, '');
      body = new TempFile(this.formId, this.fileNames[index], data, isMain);
      this.activityService.postTempFile(body)
        .subscribe(res => {
          this.tempfileId[index] = res.Id;
        });
    };
  }

  removeImage(index) {
    if (this.picId[index]) {
      (<HTMLScriptElement>document.getElementById(`input-${index}`))['value'] = null;
      this.picUrls[index] = null;
      this.fileNames[index] = null;
      this.editHobby.controls[`image${index}`].setValue('');
      this.fileData[index] = null;
      this.picsToDelete[index] = true;
    }
    if (this.tempfileId[index]) {
      (<HTMLScriptElement>document.getElementById(`input-${index}`))['value'] = null;
      this.fileNames[index] = null;
      this.editHobby.controls[`image${index}`].setValue('');
      this.fileData[index] = null;
      this.activityService.deleteTempfile(this.tempfileId[index]).subscribe();
    }
  }
  submitForm() {
    this.responding = 'saving';

    this.organizers.forEach((org) => {
      if (org.Name.toLowerCase() === this.editHobby.get('organizer').value.toLowerCase()) {
        this.organizerId = org.Id;
      }
    });
    let body = new Activity(
      this.editHobby.get('name').value,
      +this.editHobby.get('ageFrom').value,
      +this.editHobby.get('ageTo').value,
      this.editHobby.get('phones').value,
      this.editHobby.get('address').value,
      this.editHobby.get('prices').value,
      this.editHobby.get('mentor').value,
      this.editHobby.get('description').value,
      this.editHobby.get('interestId').value,
      this.isChecked,
      this.editHobby.get('free').value,
      this.formId,
      null,
      this.organizerId
    );

    let that = this;
    (function loop(i) {
      if (i < 4) {
        that.picsToDelete[i] ? that.activityService.deletePicture(that.picId[i])
          .subscribe(() => loop(++i)) : loop(++i);
      } else {
        that.activityService.putActivity(body, that.activityId)
          .subscribe(() => that.router.navigate(['/admin/act', that.activityId]));
      }
    })(0);
  }
  deleteActivity(): void {
    this.responding = 'deleting';
    this.activityService.deleteActivity(this.activityId)
      .subscribe(() => this.router.navigate(['/admin']));
  }
  ngOnInit() {
    this.route.params.subscribe(params => this.activityId = params.id);
    this.interestService.getInterests().subscribe(data => this.interests = data);

    this.activityService.getActivity(this.activityId)
      .subscribe((data) => {
        this.editHobby.controls['name'].setValue(data.Name);
        this.editHobby.controls['organizer'].setValue(data.Organizer.Name);
        this.editHobby.controls['ageFrom'].setValue(data.AgeFrom);
        this.editHobby.controls['ageTo'].setValue(data.AgeTo);
        this.editHobby.controls['interestId'].setValue(data.Interest.Id);
        this.editHobby.controls['phones'].setValue(data.Phones);
        this.editHobby.controls['address'].setValue(data.Address);
        this.editHobby.controls['prices'].setValue(data.Prices);
        this.editHobby.controls['mentor'].setValue(data.Mentor);
        this.editHobby.controls['description'].setValue(data.Description);
        this.editHobby.controls['free'].setValue(data.Free);
        data.Pictures.forEach((pic, i) => {
          if (i < 4) {
            this.editHobby.controls[`image${i}`].setValue(pic.Url);
            this.picUrls[i] = pic.Url;
            this.fileNames[i] = pic.Id;
            this.picId[i] = pic.Id;
          }
        });
        this.isChecked = data.IsChecked;
        this.organizerId = data.Organizer.Id;
        this.organizerName = data.Organizer.Name;
        this.organizerService.getOrganizers('1', this.organizerName).subscribe(res => this.organizers = res);
      });
  }
}
