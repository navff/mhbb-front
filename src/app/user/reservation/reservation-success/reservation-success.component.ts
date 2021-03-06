import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../../shared/services/activity.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './reservation-success.component.html',
  styleUrls: ['./reservation-success.component.sass'],
  providers: [ActivityService]
})
export class ReservationSuccessComponent implements OnInit {
  activity: any = {};

  constructor(
    private activityService: ActivityService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.switchMap(params => this.activityService.take(params.id))
        .subscribe(data => this.activity = data);
  }
}
