import { AuthService } from './../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CityService } from '../shared/services/city.service';
import { ActivityService } from '../shared/services/activity.service';

@Component({
  selector: 'mh-admin-main',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass'],
  providers: [CityService, ActivityService],
})
export class AdminComponent implements OnInit {
  activitiesAmount: number;
  email: string;

  constructor(private activityService: ActivityService,
    private auth: AuthService) { }

  exitAdmin(): void {
    localStorage.setItem('token', '');
    window.location.reload();
  }

  ngOnInit() {
    this.activityService.getUncheckedActivities()
      .subscribe(data => this.activitiesAmount = data.length);
    if (localStorage.getItem('token')) {
      this.auth.getUserByToken()
        .subscribe(data => this.email = data.Email);
    }
  }
}
