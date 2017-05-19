import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Activity, ActivityService } from '../shared/activity.service';
import { InterestService } from '../shared/interest.service';
@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  providers: [ActivityService, InterestService],
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  cities = [{name: 'Череповец'}, {name: 'Вологда'}];
  interests = [];
  activities: Activity[] = [];
  activityId: number;
    constructor(private activityService: ActivityService, private interestService: InterestService) {}
    keepActivityId(value) {
      this.activityId = value;
    }
    ngOnInit() {
        this.activityService.getAllActivities().subscribe((data: Response) => this.activities = data.json());
        this.interestService.getAllInterests().subscribe((data: Response) => this.interests = data.json());
    };
}
