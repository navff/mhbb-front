import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../shared/activity.service';
import { InterestService } from '../shared/interest.service';
import { CityService } from '../shared/city.service';
import { AuthService } from './../shared/auth.service';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  providers: [ActivityService, InterestService, CityService],
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  cities = [];
  interests = [];
  activities = [];
  args: any[] = [];
  userEmail: string;
  loaded = false;

  constructor(private activityService: ActivityService,
              private interestService: InterestService,
              private cityService: CityService,
              private auth: AuthService) {}

  setArgument(index, value) {
    this.activities = [];
    this.loaded = false;
    this.args[index] = value;
    this.activityService
    .getActivities(this.args[0], this.args[1], this.args[2], this.args[3], this.args[4], this.args[5])
    .then(result => {this.activities = result;
    this.loaded = true; });
  }
  admin() {
    localStorage.setItem('token', 'ABRAKADABRA');
    console.log(localStorage.getItem('token'));
  }
  ngOnInit() {
    this.activityService.getActivities().then(result => {
      this.activities = result;
      this.loaded = true; });
    this.interestService.getInterests().then(result => this.interests = result);
    this.cityService.getCities().then(result => this.cities = result);
    if (this.auth.token) {
    this.auth.getUserByToken()
    .then(result => this.userEmail = result.Email);
    }
}}
