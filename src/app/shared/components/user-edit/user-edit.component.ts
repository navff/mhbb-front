import { Component, OnInit } from '@angular/core';
import { ActivityService, TempFile } from './../../services/activity.service';
import { AuthService } from '../../services/auth.service';
import { CityService } from '../../services/city.service';
import { SharedService } from '../../services/shared.service';
import { UserService, User } from '../../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'my-user-edit',
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
  loaded = false;

  sub: Subscription;
  previousUrl: string;

  editUser: FormGroup;
  constructor(
    private auth: AuthService,
    private userService: UserService,
    private cityService: CityService,
    private activityService: ActivityService,
    private router: Router,
    private shared: SharedService,
    fb: FormBuilder) {
    this.sub = this.shared.previousUrl.subscribe(result => this.previousUrl = result);
    this.editUser = fb.group({
      'name': '',
      'phone': '',
      'role': '',
      'cityId': ''
    });
  }
  back() {
    this.router.navigate([this.previousUrl]);
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
        console.log(body);
        this.activityService.postTempFile(body)
       .then(result =>  {
         console.log(result);
         this.tempFileId = result.Id;
       });
      };
    };
  removeImage() {
    if (this.tempFileId) {
      (<HTMLScriptElement>document.getElementById(`input`))['value'] = null;
      this.fileName = null;
      this.fileData = null;
      this.fileToDelete = true;
      this.activityService.deleteTempfile(this.tempFileId)
        .then((result) => console.log(result));
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
      this.editUser.get('name').value,
      this.editUser.get('phone').value,
      role,
      this.editUser.get('cityId').value,
      this.formId
    );
    console.log(body);
    if (this.fileId && this.fileToDelete) {this.activityService.deletePicture(this.fileId); }
    this.userService.putUser(this.user.Email, body)
      .then(result => {
        this.user = result;
        console.log(result);
        this.responding = false;
        this.router.url === '/admin/edit' ? this.router.navigate(['/admin']) : this.router.navigate(['']);
      });
  }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['']);
    }
    this.cityService.getCities().then(result => this.cities = result);
    this.auth.getUserByToken()
      .then(result => {
        this.user = result;
        this.editUser.get('name').setValue(this.user.Name);
        this.editUser.get('phone').setValue(this.user.Phone);
        if (this.user.RoleName === 'PortalAdmin' || this.user.RoleName === 'PortalManager') {
          this.editUser.get('role').setValue(true);
        } else {
          this.editUser.get('role').setValue(false);
        }
        this.editUser.get('cityId').setValue(this.user.CityId);
        this.loaded = true;
        if (result.Picture) {
          this.fileName = result.Picture.Filename;
          this.fileData = result.Picture.Url;
          this.fileId = result.Picture.Id;
        }
      });
  }
}
