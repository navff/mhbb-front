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

  vote(type: string): void {
    if (localStorage.getItem('token')) {
      let oldAmount = this.activity.Voices;
      this.voicesService.vote(this.activity.Id, type)
        .subscribe(data => {
          this.activity.Voices = data;
          oldAmount === data ? this.voted = true : this.voted = false;
        });
    } else {
      this.router.navigate(['enter']);
    }
  }
  publishReview(): void {
    this.responding = true;
    let body = {
      ActivityId: parseInt(this.activity.Id, 10),
      Text: this.reviewText
    };
    this.reviewService.postReview(body)
      .subscribe(() => {
        this.published = true;
        this.responding = false;
      });
  }
  actApprove(): void {
    this.approveResponding = true;
    this.activityService.putApproveActivity(true, this.activity.Id)
      .subscribe(() => {
        this.approveResponding = false;
        this.router.navigate(['/admin']);
      });
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.activityService.getActivity(params.id)
        .subscribe(data => {
          this.activity = data;
          this.activity.Pictures.forEach((pic, i) => {
            this.pictures[i] = pic.Url;
          });
          this.loaded = true;
          this.reviewService.getReviewsByActivity(this.activity.Id)
            .subscribe(res => this.reviews = res);
        });
    });
  }
}
