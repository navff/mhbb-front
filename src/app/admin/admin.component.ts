import { AuthService } from './../shared/services/auth.service';
import { Component, OnInit }      from '@angular/core';
import { CityService } from '../shared/services/city.service';
import { ActivityService } from '../shared/services/activity.service';

@Component({
  selector: 'mh-admin-main',
  templateUrl: './admin.component.html',
  styleUrls: [ './admin.component.sass' ],
  providers: [CityService, ActivityService],
})
export class AdminComponent implements OnInit {
  activities = [];
  activitiesCount: number;
  scrolled: boolean;
  userEmail: string;
  constructor(private activityService: ActivityService,
              private auth: AuthService) {}

  exitAdmin() {
    localStorage.setItem('token' , '');
    window.location.reload();
  }
  ngOnInit() {
    this.activityService.getUncheckedActivities()
    .subscribe(result => {
      this.activities = result;
      this.activitiesCount = this.activities.length;
    });
    if (this.auth.token) {
    this.auth.getUserByToken()
    .subscribe(result => this.userEmail = result.Email);
    }
  }
}
