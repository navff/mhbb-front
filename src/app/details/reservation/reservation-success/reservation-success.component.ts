import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../../shared/activity.service';

@Component({
  selector: 'my-reservation-success',
  templateUrl: './reservation-success.component.html',
  styleUrls: ['./reservation-success.component.sass'],
  providers: [ActivityService]
})
export class ReservationSuccessComponent implements OnInit {
  activity: any = {};
  organizer: string;
  activityId = localStorage.getItem('activityId');

  constructor(private activityService: ActivityService) {}

  ngOnInit() {
    this.activityService.getActivity(this.activityId)
    .then(result => {
      this.activity = result;
      this.organizer = this.activity.Organizer.Name;
    });
}}
