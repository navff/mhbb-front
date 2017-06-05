import { Component, OnInit }      from '@angular/core';
import { CityService } from '../shared/city.service';
import { ActivityService } from '../shared/activity.service';

@Component({
  selector: 'my-admin-main',
  templateUrl: './admin.component.html',
  styleUrls: [ './admin.component.sass' ],
  providers: [CityService, ActivityService],
})
export class AdminComponent implements OnInit {
  activities = [];
  activitiesCount: number;
    constructor(private activityService: ActivityService) {}
    ngOnInit() {
        this.activityService.getUncheckedActivities()
        .then(result => this.activities = result)
        .then(() => this.activitiesCount = this.activities.length);
    };
}
