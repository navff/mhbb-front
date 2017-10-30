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
  mainPictureUrl: string;

  responding: boolean;

  form: FormGroup;
  constructor(
    private activityService: ActivityService,
    private reservationService: ReservationService,
    private router: Router,
    private route: ActivatedRoute,
    fb: FormBuilder,
  ) {
    this.form = fb.group({
      'email': ['', Validators.required],
      'name': ['', Validators.required],
      'phone': ['', Validators.required],
      'comment': '',
    });
  }
  postReservation(): void {
    this.responding = true;
    let body = new Reservation(
      this.activity.Id,
      this.form.get('email').value,
      this.form.get('name').value,
      this.form.get('phone').value,
      this.form.get('comment').value);
    this.reservationService.postReservation(body)
      .subscribe(() => this.router.navigate(['/act/', this.activity.Id, 'reservation', 'success']));
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.activityService.getActivity(params.id)
        .subscribe(data => {
          this.activity = data;
          this.mainPictureUrl = this.activity.Pictures[0].Url;
        });
    });
  }
}
