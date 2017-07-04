import { Component, OnInit } from '@angular/core';
import { CityService } from '../../shared/city.service';
import { ReviewService } from '../../shared/review.service';
import { SharedService } from './../../shared/shared.service';

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
  loaded = false;
  responding: number;

  constructor(private reviewService: ReviewService,
              private cityService: CityService,
              private shared: SharedService) {
                this.shared.destroyFooter();
  }

  setArgument(index, value) {
    this.reviews = [];
    this.loaded = false;
    this.args[index] = value;
    this.reviewService.getUncheckedReviews(this.args[0], this.args[1])
    .then(result => {this.reviews = result;
      this.loaded = true;
    });
  }
  delete(id, index) {
    this.responding = index;
    this.reviewService.deleteReview(id)
    .then(result => {
    console.log(result);
    this.reviews[index].state = -1;
    this.responding = null;
    });
  }
  accept(id, index) {
    this.responding = index;
    this.reviewService.putSetChecked(id, 'true')
    .then(result => {
    console.log(result);
    this.reviews[index].state = 1;
    this.responding = null;
    });
  }
  ngOnInit() {
      this.cityService.getCities().then(result => this.cities = result);
      this.reviewService.getUncheckedReviews()
      .then(result => {this.reviews = result;
        this.loaded = true;
        console.log(result);
        this.shared.loadFooter();
      });
}}
