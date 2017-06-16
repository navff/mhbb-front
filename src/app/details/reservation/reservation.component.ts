import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../shared/activity.service';

@Component({
  selector: 'my-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.sass'],
  providers: [ActivityService]
})
export class ReservationComponent implements OnInit {
activity: any = {};
activityId = localStorage.getItem('activityId');
mainPictureUrl: string;
constructor(private activityService: ActivityService) {}

ngOnInit() {
  this.activityService.getActivity(this.activityId)
  .then(result => {
    this.activity = result;
    this.mainPictureUrl = this.activity.Pictures[0].Url;
  });
}}
