import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { CityService } from '../../shared/city.service';
import { SharedService } from './../../shared/shared.service';

@Component({
  selector: 'my-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.sass'],
  providers: [CityService, UserService]
})
export class AdminUsersComponent implements OnInit {
  cities = [];
  users = [];

  args: any[] = [];
  page = 1;
  checkLength: number;

  loaded = false;
  responding = false;

  constructor(private userService: UserService,
              private cityService: CityService,
              private shared: SharedService) {
                this.shared.destroyFooter();
              }

  concatPage() {
    this.responding = true;
    this.page += 1;
    this.userService.getUsers(this.page.toString(10), this.args[0], this.args[1], this.args[2], this.args[3])
    .then(result => {
      this.users = this.users.concat(result);
      this.checkLength = result.length;
      this.responding = false;
    });

  }
  reset() {
    this.page = 1;
    this.users = [];
    this.loaded = false;
    this.checkLength = 0;
  }
  setArgument(index, value, index2?, value2?) {
    this.reset();
    this.args[index] = value;
    this.args[index2] = value2;
    this.userService.getUsers(this.page.toString(10), this.args[0], this.args[1], this.args[2], this.args[3])
    .then(result => {
      this.users = result;
      this.checkLength = result.length;
      this.loaded = true;
    });
  }

  ngOnInit() {
    this.cityService.getCities().then(result => this.cities = result);
    this.userService.getUsers()
    .then(result => {
      this.users = result;
      this.checkLength = result.length;
      this.loaded = true;
      this.shared.loadFooter();
    });
}}
