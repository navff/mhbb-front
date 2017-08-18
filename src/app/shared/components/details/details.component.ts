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
  activityId: string;
  voteAmount: number;
  picUrls = [];
  loaded = false;
  reviews = [];
  reviewText: string;
  published = false;
  responding = false;
  approveResponding = false;
  voted = false;

  constructor(
    private activityService: ActivityService,
    private reviewService: ReviewService,
    private voicesService: VoicesService,
    private route: ActivatedRoute,
    private router: Router) { }

  votePositive() {
    if (localStorage.getItem('token')) {
      let oldAmount = this.voteAmount;
      this.voicesService.votePositive(this.activityId)
        .subscribe(result => {
        this.voteAmount = result;
          oldAmount === result ? this.voted = true : this.voted = false;
        });
    } else {
      this.router.navigate(['enter']);
    }
  }
  voteNegative() {
    if (localStorage.getItem('token')) {
      let oldAmount = this.voteAmount;
      this.voicesService.voteNegative(this.activityId)
        .subscribe(result => {
        this.voteAmount = result;
          oldAmount === result ? this.voted = true : this.voted = false;
        });
    } else {
      this.router.navigate(['enter']);
    }
  }
  publishReview() {
    this.responding = true;
    let body = {
      ActivityId: parseInt(this.activityId, 10),
      Text: this.reviewText
    };
    this.reviewService.postReview(body)
      .subscribe(() => {
        this.published = true;
        this.responding = false;
      });
  }
  actApprove() {
    this.approveResponding = true;
    this.activityService.putApproveActivity(true, this.activityId)
      .subscribe(() => {
        this.approveResponding = false;
        this.router.navigate(['/admin']);
      });
  }
  ngOnInit() {
    this.route.params.subscribe(params => this.activityId = params['id']);
    this.activityService.getActivity(this.activityId)
      .subscribe(result => {
        this.activity = result;
        this.voteAmount = this.activity.Voices;
        this.activity.Pictures.forEach((pic, i) => {
          this.picUrls[i] = pic.Url;
        });
        this.loaded = true;
      });
    this.reviewService.getReviewsByActivity(this.activityId)
      .subscribe(result => this.reviews = result);
  }
}
