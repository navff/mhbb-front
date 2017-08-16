import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivityService } from '../../shared/services/activity.service';
import { ReservationService } from '../../shared/services/reservation.service';
import { Reservation } from '../../models/reservation.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mh-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.sass'],
  providers: [ActivityService, ReservationService]
})
export class ReservationComponent implements OnInit {
  activity: any = {};
  activityId: string;
  mainPictureUrl: string;

  loaded = false;
  responding = false;

  reservation: FormGroup;
  constructor(
    private activityService: ActivityService,
    private reservationService: ReservationService,
    private router: Router,
    private route: ActivatedRoute,
    fb: FormBuilder,
  ) {
    this.reservation = fb.group({
      'email': ['', Validators.required],
      'name': ['', Validators.required],
      'phone': ['', Validators.required],
      'comment': '',
    });
  }
  postReservation() {
    this.responding = true;
    let body = new Reservation(this.activityId,
      this.reservation.get('email').value,
      this.reservation.get('name').value,
      this.reservation.get('phone').value,
      this.reservation.get('comment').value);
    console.log(body);
    this.reservationService.postReservation(body)
      .then(result => {
        console.log(result);
        this.router.navigate(['/act/reservation/success', this.activityId]);
        this.responding = false;
      });
  }
  ngOnInit() {
    this.route.params.subscribe(params => this.activityId = params['id']);
    this.activityService.getActivity(this.activityId)
      .then(result => {
        this.activity = result;
        this.mainPictureUrl = this.activity.Pictures[0].Url;
        this.loaded = true;
      });
  }
}
