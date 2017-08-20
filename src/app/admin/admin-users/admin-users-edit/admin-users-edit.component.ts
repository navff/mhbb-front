import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../models/user.model';
import { CityService } from '../../../shared/services/city.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mh-admin-users-edit',
  templateUrl: './admin-users-edit.component.html',
  styleUrls: ['./admin-users-edit.component.sass'],
  providers: [CityService, UserService]
})
export class AdminUsersEditComponent implements OnInit {
  cities = [];
  email: string;

  loaded: boolean;
  responding: boolean;

  editUser: FormGroup;
  constructor(
    private userService: UserService,
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
    this.editUser.get('role').value === true ? role = 1 : role = 2;

    let body = new User(
      this.editUser.get('email').value,
      this.editUser.get('name').value,
      this.editUser.get('phone').value,
      role,
      this.editUser.get('cityId').value,
      null
    );
    this.userService.putUser(this.email, body)
      .subscribe(() => this.router.navigate(['/admin/users']));
  }

  ngOnInit() {
    this.route.queryParams.subscribe((data) => this.email = data.email);
    this.cityService.getCities().subscribe(data => this.cities = data);
    this.userService.getUserByEmail(this.email)
      .subscribe((data: User) => {
        this.editUser.get('email').setValue(data.Email);
        this.editUser.get('name').setValue(data.Name);
        this.editUser.get('phone').setValue(data.Phone);
        (data.RoleName === 'PortalAdmin' || data.RoleName === 'PortalManager') ?
          this.editUser.get('role').setValue(true) :
          this.editUser.get('role').setValue(false);
        this.editUser.get('cityId').setValue(data.CityId);
        this.loaded = true;
      });
  }
}
