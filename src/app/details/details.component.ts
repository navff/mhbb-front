import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../shared/activity.service';
import { VoicesService } from '../shared/voices.service';
import { ReviewService, Review } from '../shared/review.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'my-details',
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

  constructor(
    private activityService: ActivityService,
    private reviewService: ReviewService,
    private voicesService: VoicesService,
    private route: ActivatedRoute) {}

  votePositive() {
    this.voicesService.votePositive(this.activityId)
    .then(result => this.voteAmount = result);
  }
  voteNegative() {
    this.voicesService.voteNegative(this.activityId)
    .then(result => this.voteAmount = result);
  }
  publishReview() {
    this.responding = true;
    let body = new Review(parseInt(this.activityId, 10), this.reviewText);
    console.log(body);
    this.reviewService.postReview(body)
    .then(result => {
      console.log(result);
      this.published = true;
      this.responding = false; });
  }

  ngOnInit() {
    this.route.params.subscribe(params =>  this.activityId = params['id']);
    this.activityService.getActivity(this.activityId)
    .then(result => {
      this.activity = result;
      console.log(result);
      this.voteAmount = this.activity.Voices;
      this.activity.Pictures.forEach((pic, i) => {
      this.picUrls[i] = pic.Url;
      });
      this.loaded = true;
    });
    this.reviewService.getReviewsByActivity(this.activityId)
    .then(result => this.reviews = result)
    .then(() => console.log(this.reviews));
}}
