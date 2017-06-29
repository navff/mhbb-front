import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../shared/activity.service';
import { InterestService } from '../shared/interest.service';
import { CityService } from '../shared/city.service';

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
  loaded = false;

  constructor(private activityService: ActivityService,
              private interestService: InterestService,
              private cityService: CityService) {}

  setArgument(index, value) {
    this.activities = [];
    this.loaded = false;
    this.args[index] = value;
    this.activityService
    .getActivities(this.args[0], this.args[1], this.args[2], this.args[3], this.args[4], this.args[5])
    .then(result => {this.activities = result;
    this.loaded = true; });
  }

  ngOnInit() {
    this.activityService.getActivities().then(result => {
      this.activities = result;
      this.loaded = true; });
    this.interestService.getInterests().then(result => this.interests = result);
    this.cityService.getCities().then(result => this.cities = result);
}}
