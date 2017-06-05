import { Component, OnInit } from '@angular/core';
import { UserService, UserPutBody } from '../../../shared/user.service';
import { CityService } from '../../../shared/city.service';

@Component({
  selector: 'my-admin-users-edit',
  templateUrl: './admin-users-edit.component.html',
  styleUrls: ['./admin-users-edit.component.sass'],
  providers: [UserService, CityService]
})
export class AdminUsersEditComponent implements OnInit {
  cities = [];
  selectedCity: string;
  searchEmail = localStorage.getItem('userEmail');

  userEmail: string;
  userName: string;
  userPhone: string;
  userRole: string;

  user: any = {};
  constructor(private userService: UserService, private cityService: CityService) {}

  putUser() {
  let body = new UserPutBody(this.userEmail, this.userName, this.userPhone, this.userRole, 1);
  this.user.putUser(this.searchEmail, body)
  .then(result => this.user = result);
  }
ngOnInit() {
  let that = this;
  this.cityService.getCities().then(result => this.cities = result);
  this.userService.getUserByEmail(this.searchEmail)
  .then(result => this.user = result)
  .then(() => that.selectedCity = that.user.CityName)
  .then(() => that.userRole = that.user.RoleName);
}
}
