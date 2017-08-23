import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../services/activity.service';
import { VoicesService } from '../../services/voices.service';
import { ReviewService } from '../../services/review.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'mh-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass'],
  providers: [ActivityService, VoicesService, ReviewService],
})
export class DetailsComponent implements OnInit {
  activity: any = {};
  pictures = [];
  loaded = false;
  reviews = [];
  reviewText: string;
  published: boolean;
  responding: string;
  voted = false;

  constructor(
    private activityService: ActivityService,
    private reviewService: ReviewService,
    private voicesService: VoicesService,
    private route: ActivatedRoute,
    private router: Router) { }

  vote(type: string): void {
    if (localStorage.getItem('token')) {
      this.voicesService.vote(this.activity.Id, type)
        .subscribe(data => {
          this.voted = this.activity.Voices === data ? true : false;
          this.activity.Voices = data;
        });
    } else {
      this.router.navigate(['enter']);
    }
  }
  publishReview(): void {
    this.responding = 'publish';
    let body = {
      ActivityId: parseInt(this.activity.Id, 10),
      Text: this.reviewText
    };
    this.reviewService.postReview(body)
      .subscribe(() => {
        this.published = true;
        this.responding = '';
      });
  }
  actApprove(): void {
    this.responding = 'approve';
    this.activityService.putApproveActivity(true, this.activity.Id)
      .subscribe(() => this.router.navigate(['/admin']));
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.activityService.getActivity(params.id)
        .subscribe(data => {
          this.activity = data;
          this.activity.Pictures.forEach((pic, i) => this.pictures[i] = pic.Url);
          this.reviewService.getReviewsByActivity(this.activity.Id)
          .subscribe(res => {
            this.reviews = res;
            this.loaded = true;
            });
        });
    });
  }
}
