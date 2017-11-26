import { Component, OnInit } from '@angular/core';
import { UserService } from './../shared/services/user.service';
import { ListService } from '../shared/services/list.service';
import { ActivityService } from '../shared/services/activity.service';
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
              private userService: UserService) { }

  exit() {
    localStorage.setItem('token', '');
    window.location.reload();
  }

  ngOnInit() {
    this.activityService.listUnchecked()
      .subscribe(data => this.activitiesAmount = data.length);
    if (localStorage.getItem('token')) {
      this.userService.takeCurrent()
        .subscribe((data: User) => this.email = data.Email);
    }
  }
}
