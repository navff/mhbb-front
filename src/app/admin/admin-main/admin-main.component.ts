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
  constructor(private activityService: ActivityService,
              private cityService: CityService,
              private interestService: InterestService) {}

ngOnInit() {
  this.cityService.getAllCities().subscribe((data: Response) => this.cities = data.json());
  this.interestService.getAllInterests().subscribe((data: Response) => this.interests = data.json());
  this.activityService.getAllUncheckedActivities().subscribe((data: Response) => this.uncheckedActivities = data.json());
    };
}
