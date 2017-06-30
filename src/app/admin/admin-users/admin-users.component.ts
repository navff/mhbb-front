import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { CityService } from '../../shared/city.service';
import { Router } from '@angular/router';

@Component({
  selector: 'my-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.sass'],
  providers: [CityService, UserService]
})
export class AdminUsersComponent implements OnInit {
  cities = [];
  users = [];
  reserveContent = [1];
  args: any[] = [];
  page = 1;

  loaded = false;
  responding = false;

  constructor(private userService: UserService,
              private cityService: CityService,
              private router: Router) {}
  toUserEdit(url) {
    this.router.navigate(['/admin/users/edit'], { queryParams: { email: url}});
  }
  concatPage() {
    this.responding = true;
    this.page += 1;
    let reservePage = this.page + 1;
    this.userService.getUsers(this.page.toString(10), this.args[0], this.args[1], this.args[2], this.args[3])
    .then(result => this.users = this.users.concat(result))
    .then(() => {
      this.userService.getUsers(reservePage.toString(10), this.args[0], this.args[1], this.args[2], this.args[3])
      .then(result => {this.reserveContent = result;
        this.responding = false; });
    });
  }
  reset() {
    this.page = 1;
    this.reserveContent[0] = 1;
    this.users = [];
    this.loaded = false;
  }
  setArgument(index, value, index2?, value2?) {
    this.reset();
    this.args[index] = value;
    this.args[index2] = value2;
    this.userService.getUsers(this.page.toString(10), this.args[0], this.args[1], this.args[2], this.args[3])
    .then(result => {this.users = result;
      this.loaded = true; });
  }

  ngOnInit() {
    this.cityService.getCities().then(result => this.cities = result);
    this.userService.getUsers()
    .then(result => {this.users = result;
      this.loaded = true; });
}}
