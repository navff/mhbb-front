import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../shared/activity.service';
import { CityService } from '../../shared/city.service';
import { InterestService } from '../../shared/interest.service';
import { SharedService } from './../../shared/shared.service';

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
  loaded = false;
  uncheckedActivities = [];
  uncheckedLoaded = false;
  args: any[] = [];

  constructor(private activityService: ActivityService,
              private cityService: CityService,
              private interestService: InterestService,
              private shared: SharedService) {
                this.shared.destroyFooter();
              }
  setArgument(index, value) {
    this.loaded = false;
    this.uncheckedLoaded = false;
    this.activities = [];
    this.uncheckedActivities = [];

    this.args[index] = value;
    this.activityService
    .getUncheckedActivities(this.args[0], this.args[1], this.args[2], this.args[3], this.args[4], this.args[5])
    .then(result => {this.uncheckedActivities = result;
      this.uncheckedLoaded = true;
      this.activityService
      .getActivities(this.args[0], this.args[1], this.args[2], this.args[3], this.args[4], this.args[5])
      .then(act => {this.activities = act;
        this.loaded = true;
      });
    });

  }
  ngOnInit() {
    this.cityService.getCities().then(result => this.cities = result);
    this.interestService.getInterests().then(result => this.interests = result);
    this.activityService.getUncheckedActivities()
    .then(result => {this.uncheckedActivities = result;
      this.uncheckedLoaded = true;
      this.activityService.getActivities()
      .then(acts => {this.activities = acts;
        this.loaded = true;
        this.shared.loadFooter();
      });
    });
}}
