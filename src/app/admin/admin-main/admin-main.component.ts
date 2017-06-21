import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../shared/activity.service';
import { CityService } from '../../shared/city.service';
import { InterestService } from '../../shared/interest.service';

@Component({
  selector: 'my-admin-main',
  templateUrl: './admin-main.component.html',
  providers: [ActivityService, CityService, InterestService],
  styleUrls: ['./admin-main.component.sass']
})
export class AdminMainComponent implements OnInit {
  interests = [];
  cities = [];

  activities = [];
  uncheckedActivities = [];
  args: any[] = [];

  constructor(private activityService: ActivityService,
              private cityService: CityService,
              private interestService: InterestService) {}

  setArgument(index, value) {
    this.args[index] = value;
    this.activityService
    .getActivities(this.args[0], this.args[1], this.args[2], this.args[3], this.args[4], this.args[5])
    .then(result => this.activities = result);

    this.activityService
    .getUncheckedActivities(this.args[0], this.args[1], this.args[2], this.args[3], this.args[4], this.args[5])
    .then(result => this.uncheckedActivities = result);
  }
  ngOnInit() {
    this.cityService.getCities().then(result => this.cities = result);
    this.interestService.getInterests().then(result => this.interests = result);
    this.activityService.getActivities().then(result => this.activities = result);
    this.activityService.getUncheckedActivities().then(result => this.uncheckedActivities = result);
}}
