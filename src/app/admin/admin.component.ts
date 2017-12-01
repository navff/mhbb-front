import { Component, OnInit } from '@angular/core';
import { UserService } from './../shared/services/user.service';
import { ActivityService } from '../shared/services/activity.service';
import { SharedService } from './../shared/services/shared.service';
import { User } from 'src/app/models/user.model';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass'],
  providers: [ActivityService],
})
export class AdminComponent implements OnInit {
  activitiesAmount: number;
  email: string;

  constructor(private activityService: ActivityService,
              private userService: UserService,
              private shared: SharedService) { }

  exit() {
    localStorage.setItem('token', '');
    window.location.reload();
  }

  ngOnInit() {
    this.activityService.listUnchecked()
      .switchMap(() => this.shared.activitiesNumber$)
      .subscribe(data => this.activitiesAmount = data);
    if (localStorage.getItem('token')) {
      this.userService.takeCurrent()
        .subscribe((data: User) => this.email = data.Email);
    }
  }
}
