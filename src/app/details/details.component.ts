import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../shared/activity.service';
import { VoicesService } from '../shared/voices.service';
import { ReviewService, Review } from '../shared/review.service';

@Component({
  selector: 'my-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass'],
  providers: [ActivityService, VoicesService, ReviewService],
})
export class DetailsComponent implements OnInit {
  activity: any = {};
  activityId = localStorage.getItem('activityId');
  voteAmount: number;
  picUrls = [];
  reviews = [];
  reviewText: string;
  published = false;

  constructor(
    private activityService: ActivityService,
    private reviewService: ReviewService,
    private voicesService: VoicesService) {}

  votePositive() {
    this.voicesService.votePositive(this.activityId)
    .then(result => this.voteAmount = result);
  }
  voteNegative() {
    this.voicesService.voteNegative(this.activityId)
    .then(result => this.voteAmount = result);
  }

  publishReview() {
    let body = new Review(parseInt(this.activityId, 10), this.reviewText);
    console.log(body);
    this.reviewService.postReview(body)
    .then(result => {
      console.log(result);
      this.published = true; });
  }

  ngOnInit() {
    this.activityService.getActivity(this.activityId)
    .then(result => {
      this.activity = result;
      console.log(result);
      this.voteAmount = this.activity.Voices;
      this.activity.Pictures.forEach((pic, i) => {
      this.picUrls[i] = pic.Url;
      });
    });
    this.reviewService.getReviewsByActivity(this.activityId)
    .then(result => this.reviews = result)
    .then(() => console.log(this.reviews));
}}
