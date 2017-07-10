import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../shared/services/activity.service';
import { InterestService } from '../../shared/services/interest.service';
import { CityService } from '../../shared/services/city.service';
import { SharedService } from './../../shared/services/shared.service';

@Component({
  selector: 'my-main',
  templateUrl: './main.component.html',
  providers: [ActivityService, InterestService, CityService],
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  cities = [];
  interests = [];
  activities = [];
  args: any[] = [];
  loaded = false;

  checkLength: number;
  page = 1;
  responding = false;

  constructor(
    private activityService: ActivityService,
    private interestService: InterestService,
    private cityService: CityService,
    private shared: SharedService) {
    this.shared.destroyFooter();
  }
  reset() {
    this.page = 1;
    this.activities = [];
    this.loaded = false;
    this.checkLength = 0;
  }
  setArgument(index, value) {
    this.reset();
    this.activities = [];
    this.loaded = false;
    this.args[index] = value;
    this.activityService
      .getActivities(this.args[0], this.args[1], this.args[2], this.args[3], this.args[4], this.args[5])
      .then(result => {
        this.activities = result;
        this.checkLength = result.length;
        this.loaded = true;
      });
  }
  concatPage() {
    this.responding = true;
    this.page += 1;
    this.activityService.getActivities(this.page.toString(10))
      .then(result => {
        this.activities = this.activities.concat(result);
        this.checkLength = result.length;
        this.responding = false;
      });
  }
  ngOnInit() {
    this.activityService.getActivities().then(result => {
      this.activities = result;
      this.checkLength = result.length;
      this.loaded = true;
      this.shared.loadFooter();
    });
    this.interestService.getInterests().then(result => this.interests = result);
    this.cityService.getCities().then(result => this.cities = result);
  }
}
