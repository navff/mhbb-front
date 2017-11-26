import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../services/activity.service';
import { VoicesService } from '../../services/voices.service';
import { ReviewService } from '../../services/review.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass'],
  providers: [ActivityService, VoicesService, ReviewService],
})
export class DetailsComponent implements OnInit {
  activity: any = [];
  pictures = [];
  reviews = [];
  reviewText: string;

  published: boolean;
  responding: string;
  voted: boolean;
  isAuthorized: boolean;

  constructor(
    private activityService: ActivityService,
    private reviewService: ReviewService,
    private voicesService: VoicesService,
    private route: ActivatedRoute,
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
    let body = {
      ActivityId: parseInt(this.activity.Id, 10),
      Text: this.reviewText
    };
    this.reviewService.create(body)
      .subscribe(() => {
        this.published = true;
        this.responding = '';
      });
  }
  approve() {
    this.responding = 'approve';
    this.activityService.setCheck(true, this.activity.Id)
      .subscribe(() => this.router.navigate(['/admin']));
  }
  ngOnInit() {
    this.route.params
      .switchMap(params => this.activityService.take(params.id))
      .switchMap(data => {
        this.activity = data;
        this.activity.Pictures.forEach((pic, i) => this.pictures[i] = pic.Url);
        return this.reviewService.listByActivity(this.activity.Id);
      })
      .subscribe(res => this.reviews = res);
  }
}
