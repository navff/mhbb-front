import { Component, OnInit } from '@angular/core';
import { AuthService } from './../shared/auth.service';
import { CityService } from '../shared/city.service';
import { UserService, User } from '../shared/user.service';
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
  selectedCity: string;

  userName: string;
  userPhone: string;
  userRole: string;

  fileName: string;
  fileData: string;

  user: any = {};

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private cityService: CityService,
    private router: Router) {}
  addImage(event) {
      let data, file: File;
      file = event.target.files[0];

      this.fileName = file.name;
      // this.addHobby.controls[`image${index}`].setValue(file.name);

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
      // this.addHobby.controls[`image${index}`].setValue('');
      this.fileData = null;
  }

  putUser() {
    let body = new User(this.user.Email, this.userName, this.userPhone, this.userRole, 1);
    this.userService.putUser(this.user.Email, body)
    .then(result => {this.user = result;
      console.log(result);
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
      this.selectedCity = this.user.CityName;
      this.userRole = this.user.RoleName;
    });
  }
}
