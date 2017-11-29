import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../shared/services/activity.service';
import { Reservation } from '../../models/reservation.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.sass'],
  providers: [ActivityService]
})
export class ReservationComponent implements OnInit {
  activity: any = {};
  picUrl: string;

  reservation = new Reservation();
  responding: boolean;
  constructor(
    private activityService: ActivityService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }
  reserve() {
    this.responding = true;
    this.reservation.ActivityId = this.activity.Id;
    this.activityService.reserve(this.reservation)
      .subscribe(() => this.router.navigate(['success'], { relativeTo: this.route }));
  }
  ngOnInit() {
    this.route.params
      .switchMap(params => this.activityService.take(params.id))
      .subscribe(data => {
        this.activity = data;
        this.picUrl = data.Pictures[0].Url;
      });
  }
}
