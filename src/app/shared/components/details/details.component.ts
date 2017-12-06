import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../services/activity.service';
import { VoicesService } from '../../services/voices.service';
import { ReviewService } from '../../services/review.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from './../../../models/activity.model';

@Component({
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass'],
  providers: [ActivityService, VoicesService, ReviewService],
})
export class DetailsComponent implements OnInit {
  activity = new Activity();
  pictures = [];
  reviews = [];

  review = {
    Text: '',
    Id: '',
  };

  published: boolean;
  error: boolean;
  responding: string;
  voted: boolean;
  isAuthorized: boolean;

  constructor(
    private activityService: ActivityService,
    private reviewService: ReviewService,
    private voicesService: VoicesService,
    private route: ActivatedRoute,
    private titleService: Title,
    private router: Router) {
    this.isAuthorized = !!localStorage.getItem('token');
  }

  vote(type: string) {
    if (this.isAuthorized) {
      this.voicesService.vote(this.activity.Id, type)
        .subscribe(data => {
          this.voted = this.activity.Voices === data ? true : false;
          this.activity.Voices = data;
        });
    }
  }
  publishReview() {
    this.responding = 'publish';
    this.reviewService.create(this.review)
      .subscribe(() => {
        this.published = true;
        this.responding = '';
      });
  }
  approve() {
    this.responding = 'approve';
    this.activityService.setCheck(true, this.activity.Id)
      .subscribe(() => this.router.navigate(['/admin']),
      err => {
        if (err.error.Message.match('email')) {
          this.error = true;
          this.responding = null;
        }
      });
  }
  ngOnInit() {
    this.route.params
    .switchMap(params => this.activityService.take(params.id))
    .switchMap(data => {
        this.titleService.setTitle(data.Name + ' - Моё Хобби');
        this.activity = data;
        this.review.Id = data.Id;
        this.activity.Pictures.forEach((pic, i) => this.pictures[i] = pic.Url);
        return this.reviewService.listByActivity(this.activity.Id);
      })
      .subscribe(res => this.reviews = res);
  }
}
