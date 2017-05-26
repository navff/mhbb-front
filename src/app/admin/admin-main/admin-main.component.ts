import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
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
    console.log(this.args, index, value);
    this.activityService
    .getActivities(this.args[0], this.args[1], this.args[2], this.args[3], this.args[4], this.args[5])
    .subscribe((data: Response) => this.activities = data.json());
    this.activityService
    .getUncheckedActivities(this.args[0], this.args[1], this.args[2], this.args[3], this.args[4], this.args[5])
    .subscribe((data: Response) => this.uncheckedActivities = data.json());
  }
ngOnInit() {
  this.cityService.getCities().subscribe((data: Response) => this.cities = data.json());
  this.interestService.getInterests().subscribe((data: Response) => this.interests = data.json());
  this.activityService.getActivities().subscribe((data: Response) => this.activities = data.json());
  this.activityService.getUncheckedActivities().subscribe((data: Response) => this.uncheckedActivities = data.json());
    };
}
