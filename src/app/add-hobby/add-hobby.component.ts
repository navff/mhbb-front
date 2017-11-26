import { TempFile } from './../models/tempfile.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ListService } from './../shared/services/list.service';
import { ActivityService } from '../shared/services/activity.service';
import { OrganizerService } from '../shared/services/organizer.service';
import { Activity } from '../models/activity.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './add-hobby.component.html',
  providers: [ActivityService, OrganizerService],
  styleUrls: ['./add-hobby.component.sass']
})
export class AddHobbyComponent implements OnInit {
  interests: any[];
  cities: any[];
  organizers: any[];
  organizerId: any;
  pics = [];
  formId: string;

  isChecked: boolean;
  responding: boolean;
  isOrganizerChosen: boolean;

  form: FormGroup;

  constructor(
    private listService: ListService,
    private organizerService: OrganizerService,
    fb: FormBuilder,
    private activityService: ActivityService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.form = fb.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      organizerName: ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      cityId: ['', Validators.required],
      ageFrom: ['', Validators.required],
      ageTo: ['', Validators.required],
      interestId: ['', Validators.required],
      phones: ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      address: ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      prices: ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      mentor: ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      description: ['', Validators.compose([Validators.required, Validators.maxLength(1000)])],
      free: [false, Validators.required],
      sobriety: [false, Validators.required]
    });
  }
  filterOrganizers(value?) {
    if (this.isOrganizerChosen) {
      this.isOrganizerChosen = false;
      this.form.controls['cityId'].setValue('');
      this.form.controls['sobriety'].setValue(false);
      this.form.controls['cityId'].enable();
      this.form.controls['sobriety'].enable();
    }
    this.organizerService.list('1', value || null).subscribe(data => this.organizers = data);
  }
  setOrganizer(id: string) {
    this.isOrganizerChosen = true;
    document.getElementById('organizerInput').blur();
    this.organizerId = id;
    this.form.controls['cityId'].disable();
    this.form.controls['sobriety'].disable();
    this.organizerService.take(id).subscribe(data => {
      this.form.controls['cityId'].setValue(data.CityId);
      this.form.controls['sobriety'].setValue(data.Sobriety);
    });
  }
  addImage(file, id) {
    this.formId = this.formId || Date.now().toString(10);
    let isMain = id === 0 ? true : false;
    this.activityService.createTempFile(new TempFile(this.formId, file.name, file.data, isMain))
      .subscribe(res => {
        this.pics[id] = {};
        this.pics[id].url = res.Url;
        this.pics[id].id = res.Id;
      });
  }
  removeImage(id) {
    this.activityService.removeTempFile(this.pics[id].id)
      .subscribe(() => this.pics[id].url = '');
  }
  submit() {
    this.responding = true;
    let organizer = {
      Name: this.form.get('organizerName').value,
      CityId: this.form.get('cityId').value,
      Sobriety: this.form.get('sobriety').value
    };
    let body = new Activity(
      this.form.get('name').value,
      +this.form.get('ageFrom').value,
      +this.form.get('ageTo').value,
      this.form.get('phones').value,
      this.form.get('address').value,
      this.form.get('prices').value,
      this.form.get('mentor').value,
      this.form.get('description').value,
      this.form.get('interestId').value,
      this.isChecked,
      this.form.get('free').value,
      this.formId,
      this.isOrganizerChosen ? null : organizer,
      this.isOrganizerChosen ? this.organizerId : null
    );
    this.activityService.create(body)
      .subscribe(() => this.router.navigate(['/success'], { relativeTo: this.route }));
  }
  back() {
    history.back();
  }
  ngOnInit() {
    this.listService.interests$.subscribe(data => this.interests = data);
    this.listService.cities$.subscribe(data => this.cities = data);
  }
}
