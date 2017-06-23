import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivityService } from '../../shared/activity.service';
import { ReservationService, Reservation } from '../../shared/reservation.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'my-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.sass'],
  providers: [ActivityService, ReservationService]
})
export class ReservationComponent implements OnInit {
activity: any = {};
activityId: string;
mainPictureUrl: string;

reservation: FormGroup;
constructor(private activityService: ActivityService,
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
    let body = new Reservation(this.activityId,
      this.reservation.get('email').value,
      this.reservation.get('name').value,
      this.reservation.get('phone').value,
      this.reservation.get('comment').value);
    console.log(body);
    this.reservationService.postReservation(body)
    .then(result => {console.log(result);
    this.router.navigate(['/details/reservation/reservationsuccess', this.activityId]); });
  }
ngOnInit() {
  this.route.params.subscribe(params =>  this.activityId = params['id']);
  this.activityService.getActivity(this.activityId)
  .then(result => {
    this.activity = result;
    this.mainPictureUrl = this.activity.Pictures[0].Url;
  });
}}
