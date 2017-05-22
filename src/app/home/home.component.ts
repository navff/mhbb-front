import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
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
  activityId: number;

    constructor(private activityService: ActivityService,
                private interestService: InterestService,
                private cityService: CityService) {}
    keepActivityId(value) {
      this.activityId = value;
    }
    ngOnInit() {
        this.activityService.getAllActivities().subscribe((data: Response) => this.activities = data.json());
        this.interestService.getAllInterests().subscribe((data: Response) => this.interests = data.json());
        this.cityService.getAllCities().subscribe((data: Response) => this.cities = data.json());
    };
}
