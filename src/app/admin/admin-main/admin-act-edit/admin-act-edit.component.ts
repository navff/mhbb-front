import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { InterestService } from '../../../shared/interest.service';
import { OrganizerService } from './../../../shared/organizer.service';
import { ActivityService, TempFile, Activity } from '../../../shared/activity.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'my-admin-act-edit',
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
  organizers = [];
  filteredOrganizers: any;
  myContent: any[] = [];
  responding = false;
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
      'name' : ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      'organizer' : ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      'ageFrom' : ['', Validators.required],
      'ageTo' : ['', Validators.required],
      'interestId' : ['', Validators.required],
      'phones' : ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      'address' : ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      'prices' : ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      'mentor' : ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      'description' : ['', Validators.compose([Validators.required, Validators.maxLength(1000)])],
      'free' : [false, Validators.required],
      'image0' : [''],
      'image1' : [''],
      'image2' : [''],
      'image3' : ['']
    });
  }
  filterOrganizers (value) {
    console.log(value);
    this.organizerService.getOrganizers('1', value).then(result =>  this.filteredOrganizers = result );
  }
  setOrganizerId(id) {
    this.organizerId = id;
    console.log(this.organizerId);
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
        console.log(body);
        this.activityService.postTempFile(body)
       .then(result =>  {
         console.log(result);
         this.tempfileId[index] = result.Id;
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
      this.activityService.deleteTempfile(this.tempfileId[index])
      .then((result) => console.log(result));
    }
  }
  submitForm() {
    this.responding = true;

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
    console.log(body);

    let that = this;
    (function loop(i) {
      if (i < 4) {
        console.log(i, that.picsToDelete[i]);
        that.picsToDelete[i] ? that.activityService.deletePicture(that.picId[i])
        .then(() => loop(++i)) : loop(++i);
      } else {
        that.activityService.putActivity(body, that.activityId)
        .then(result => {console.log(result);
          that.responding = false;
          that.router.navigate(['/admin/act', that.activityId]);
        });
      }
    })(0);
  }

  ngOnInit() {
    this.route.params.subscribe(params =>  this.activityId = params['id']);
    this.interestService.getInterests().then(result => this.interests = result);
    this.organizerService.getOrganizers().then(result => this.organizers = result);

    this.activityService.getActivity(this.activityId)
    .then((result) => {
      console.log(result);
      this.editHobby.controls['name'].setValue(result.Name);
      this.editHobby.controls['organizer'].setValue(result.Organizer.Name);
      this.editHobby.controls['ageFrom'].setValue(result.AgeFrom);
      this.editHobby.controls['ageTo'].setValue(result.AgeTo);
      this.editHobby.controls['interestId'].setValue(result.Interest.Id);
      this.editHobby.controls['phones'].setValue(result.Phones);
      this.editHobby.controls['address'].setValue(result.Address);
      this.editHobby.controls['prices'].setValue(result.Prices);
      this.editHobby.controls['mentor'].setValue(result.Mentor);
      this.editHobby.controls['description'].setValue(result.Description);
      this.editHobby.controls['free'].setValue(result.Free);
      result.Pictures.forEach((pic, i) => {
        if (i < 4) {
          this.editHobby.controls[`image${i}`].setValue(pic.Url);
          this.picUrls[i] = pic.Url;
          this.fileNames[i] = pic.Id;
          this.picId[i] = pic.Id;
        }
      });
      this.isChecked = result.IsChecked;
      this.organizerId = result.Organizer.Id;
    });
}}
