import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../../shared/user.service';
import { CityService } from '../../../shared/city.service';

@Component({
  selector: 'my-admin-users-edit',
  templateUrl: './admin-users-edit.component.html',
  styleUrls: ['./admin-users-edit.component.sass'],
  providers: [CityService, UserService]
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
    let body = new User(this.userEmail, this.userName, this.userPhone, this.userRole, 1);
    this.user.putUser(this.searchEmail, body)
    .then(result => this.user = result);
  }
  ngOnInit() {
    this.cityService.getCities().then(result => this.cities = result);
    this.userService.getUserByEmail(this.searchEmail)
    .then(result => {
      this.user = result;
      this.selectedCity = this.user.CityName;
      this.userRole = this.user.RoleName;
    });
}}
