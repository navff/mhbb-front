import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../../shared/services/activity.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'my-reservation-success',
  templateUrl: './reservation-success.component.html',
  styleUrls: ['./reservation-success.component.sass'],
  providers: [ActivityService]
})
export class ReservationSuccessComponent implements OnInit {
  activity: any = {};
  activityId: string;

  constructor(
    private activityService: ActivityService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.activityId = params['id']);
    this.activityService.getActivity(this.activityId)
      .then(result => {
        this.activity = result;
      });
  }
}
