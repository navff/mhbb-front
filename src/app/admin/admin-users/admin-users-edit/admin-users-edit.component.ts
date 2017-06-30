import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../../shared/user.service';
import { CityService } from '../../../shared/city.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'my-admin-users-edit',
  templateUrl: './admin-users-edit.component.html',
  styleUrls: ['./admin-users-edit.component.sass'],
  providers: [CityService, UserService]
})
export class AdminUsersEditComponent implements OnInit {
  cities = [];
  searchEmail: string;
  email: string;

  user: any = {};

  responding = false;

  editUser: FormGroup;
  constructor(private userService: UserService,
              private cityService: CityService,
              private router: Router,
              private route: ActivatedRoute,
              fb: FormBuilder) {
    this.editUser = fb.group({
        'email': '',
        'name': '',
        'phone': '',
        'role': '',
        'cityId': '',
    });
    }

  putUser() {
    this.responding = true;
    let role: number;
    if (this.editUser.get('role').value === true) {
      role = 1;
    } else {
      role = 0;
    }
    let body = new User(
      this.editUser.get('email').value,
      this.editUser.get('name').value,
      this.editUser.get('phone').value,
      role,
      this.editUser.get('cityId').value,
      null
    );
    this.userService.putUser(this.searchEmail, body)
    .then(result => {this.user = result;
      this.router.navigate(['/admin/users']);
    });
  }
  ngOnInit() {
    let params: any = this.route.queryParams;
    this.searchEmail = params.value.email;
    console.log(this.searchEmail);
    this.cityService.getCities().then(result => this.cities = result);
    this.userService.getUserByEmail(this.searchEmail)
    .then(result => {
      this.user = result;
      this.editUser.get('email').setValue(this.user.Email);
      this.editUser.get('name').setValue(this.user.Name);
      this.editUser.get('phone').setValue(this.user.Phone);
      if (this.user.RoleName === 'PortalAdmin' || this.user.RoleName === 'PortalManager') {
        this.editUser.get('role').setValue(true);
      } else {
        this.editUser.get('role').setValue(false);
      }
      this.editUser.get('cityId').setValue(this.user.CityId);
      console.log(this.user);
    });
}}
