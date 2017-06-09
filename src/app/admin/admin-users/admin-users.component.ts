import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { CityService } from '../../shared/city.service';

@Component({
  selector: 'my-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.sass'],
  providers: [UserService, CityService]
})
export class AdminUsersComponent implements OnInit {
  cities = [];
  users = [];
  reserveContent = [1];
  args: any[] = [];
  page = 1;

  constructor(private userService: UserService, private cityService: CityService) {}

  concatPage() {
    this.page += 1;
    let reservePage = this.page + 1;
    this.userService.getUsers(this.page, this.args[0], this.args[1], this.args[2], this.args[3])
    .then(result => this.users = this.users.concat(result))
    .then(() => {
      this.userService.getUsers(reservePage, this.args[0], this.args[1], this.args[2], this.args[3])
      .then(result => this.reserveContent = result);
    });
  }
  reset() {
    this.page = 1;
    this.reserveContent[0] = 1;
  }
  setArgument(index, value, index2?, value2?) {
    this.reset();
    this.args[index] = value;
    this.args[index2] = value2;
    this.userService.getUsers(this.page, this.args[0], this.args[1], this.args[2], this.args[3])
    .then(result => this.users = result);
  }
  saveUserEmail(email) {
    localStorage.setItem('userEmail', email);
  }

  ngOnInit() {
    this.cityService.getCities().then(result => this.cities = result);
    this.userService.getUsers().then(result => this.users = result);
}}
