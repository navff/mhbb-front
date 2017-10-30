import { Component, OnInit } from '@angular/core';
import { ActivityService } from './../../services/activity.service';
import { TempFile } from '../../../models/tempfile.model';
import { CityService } from '../../services/city.service';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';

@Component({
  selector: 'mh-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.sass'],
  providers: [CityService, UserService, ActivityService]
})
export class UserEditComponent implements OnInit {
  cities = [];

  fileName: string;
  fileData: string;
  fileId: string;
  tempFileId: string;
  formId: any;
  fileToDelete = false;
  user: any = {};

  responding = false;

  sub: Subscription;

  editUser: FormGroup;
  constructor(
    private userService: UserService,
    private cityService: CityService,
    private activityService: ActivityService,
    private router: Router,
    fb: FormBuilder) {
    this.editUser = fb.group({
      'email': '',
      'name': '',
      'phone': '',
      'role': '',
      'cityId': ''
    });
  }
  back() {
    history.back();
  }
  addImage(event) {
    let data, body, file: File;
    file = event.target.files[0];

    this.formId = Date.now().toString(10);
    this.fileName = file.name;

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.fileData = reader.result;
      data = this.fileData.replace(/^data:image\/[a-z]+;base64,/, '');
      body = new TempFile(this.formId, this.fileName, data, true);
      this.activityService.postTempFile(body)
        .subscribe(res => {
          this.tempFileId = res.Id;
        });
    };
  };
  removeImage() {
    if (this.tempFileId) {
      (<HTMLScriptElement>document.getElementById(`input`))['value'] = null;
      this.fileName = null;
      this.fileData = null;
      this.fileToDelete = true;
      this.activityService.deleteTempfile(this.tempFileId).subscribe();
    }
    if (this.fileId) {
      (<HTMLScriptElement>document.getElementById(`input`))['value'] = null;
      this.fileName = null;
      this.fileData = null;
      this.fileToDelete = true;
    }
  }

  putUser() {
    this.responding = true;
    let role: number;
    if (this.editUser.get('role').value === true) {
      role = 1;
    } else {
      role = 2;
    }
    let body = new User(
      this.editUser.get('email').value,
      this.editUser.get('name').value,
      this.editUser.get('phone').value,
      role,
      this.editUser.get('cityId').value,
      this.formId
    );
    if (this.fileId && this.fileToDelete) { this.activityService.deletePicture(this.fileId).subscribe(); }
    this.userService.putUser(this.user.Email, body)
      .subscribe(user => {
        this.user = user;
        this.responding = false;
        this.router.url === '/admin/edit' ? this.router.navigate(['/admin']) : this.router.navigate(['']);
      });
  }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['']);
    }
    this.cityService.getCities().subscribe(data => this.cities = data);
    this.userService.getByToken()
      .subscribe(user => {
        this.user = user;
        this.editUser.get('email').setValue(this.user.Email);
        this.editUser.get('name').setValue(this.user.Name);
        this.editUser.get('phone').setValue(this.user.Phone);
        if (this.user.RoleName === 'PortalAdmin' || this.user.RoleName === 'PortalManager') {
          this.editUser.get('role').setValue(true);
        } else {
          this.editUser.get('role').setValue(false);
        }
        this.editUser.get('cityId').setValue(this.user.CityId);
        if (user.Picture) {
          this.fileName = user.Picture.Filename;
          this.fileData = user.Picture.Url;
          this.fileId = user.Picture.Id;
        }
      });
  }
}
