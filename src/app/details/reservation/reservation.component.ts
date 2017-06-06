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
organizer: string;
activityId = localStorage.getItem('activityId');

constructor(private activityService: ActivityService) {}

ngOnInit() {
  let that = this;
  this.activityService.getActivity(this.activityId)
  .then(result => this.activity = result)
  .then(() => that.organizer = that.activity.Organizer.Name);
}
}
