import { Component, OnInit } from '@angular/core';
import { CityService } from '../../shared/city.service';
import { ReviewService } from '../../shared/review.service';

@Component({
  selector: 'my-admin-reviews',
  templateUrl: './admin-reviews.component.html',
  styleUrls: ['./admin-reviews.component.sass'],
  providers: [ReviewService, CityService]
})
export class AdminReviewsComponent implements OnInit {
  reviews = [];
  cities = [];
  args: any[] = [];

  constructor(private reviewService: ReviewService, private cityService: CityService) {}

  setArgument(index, value) {
      this.args[index] = value;
      this.reviewService.getUncheckedReviews(this.args[0], this.args[1])
      .then(result => this.reviews = result);
  }
  delete(id, index) {
    this.reviews[index].state = -1;
    this.reviewService.deleteReview(id)
    .then(result => console.log(result));
  }
  accept(id, index) {
    this.reviews[index].state = 1;
    this.reviewService.putSetChecked(id, 'true')
    .then(result => console.log(result));
  }
  ngOnInit() {
      this.cityService.getCities().then(result => this.cities = result);
      this.reviewService.getUncheckedReviews().then(result => {this.reviews = result;
      console.log(result); });
}}
