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
  args: any[] = [null, null, null, null, null, null];
    constructor(private activityService: ActivityService,
                private interestService: InterestService,
                private cityService: CityService) {}

    setArgument(index, value) {
      this.args[index] = value;
      console.log(this.args, index, value);
      this.activityService
      .searchActivities(this.args[0], this.args[1], this.args[2], this.args[3], this.args[4], this.args[5])
      .subscribe((data: Response) => this.activities = data.json());
    }

    ngOnInit() {
        this.activityService.searchActivities().subscribe((data: Response) => this.activities = data.json());
        this.interestService.getAllInterests().subscribe((data: Response) => this.interests = data.json());
        this.cityService.getAllCities().subscribe((data: Response) => this.cities = data.json());
    };
}
