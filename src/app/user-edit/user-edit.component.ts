import { Component, OnInit } from '@angular/core';
import { AuthService } from './../shared/auth.service';
import { CityService } from '../shared/city.service';
import { SharedService } from './../shared/shared.service';
import { UserService, User } from '../shared/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'my-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.sass'],
  providers: [CityService, UserService]
})
export class UserEditComponent implements OnInit {
  cities = [];

  fileName: string;
  fileData: string;

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
      let data, file: File;
      file = event.target.files[0];

      this.fileName = file.name;
      // this.editUser.controls[`image`].setValue(file.name);

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.fileData = reader.result;
        data = this.fileData.replace(/^data:image\/[a-z]+;base64,/, '');
      //   body = new TempFile(this.formId, this.fileNames[index], data, isMain);
      //   console.log(body);
      //   this.activityService.postTempFile(body)
      //  .then(result =>  {
      //    console.log(result);
      //    this.fileId[index] = result.Id;
      //  });
      // };
    };
  }
  removeImage() {
      (<HTMLScriptElement>document.getElementById(`input`))['value'] = null;
      this.fileName = null;
      // this.editUser.controls[`image`].setValue('');
      this.fileData = null;
  }

  putUser() {
    this.responding = true;
    let role = 0;
    let body = new User(
      this.user.Email,
      this.editUser.get('name').value,
      this.editUser.get('phone').value,
      role,
      this.editUser.get('cityId').value,
      null
      );
    console.log(body);
    this.userService.putUser(this.user.Email, body)
    .then(result => {this.user = result;
      console.log(result);
      this.responding = false;
      this.router.navigate(['']);
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
    });
  }
}
