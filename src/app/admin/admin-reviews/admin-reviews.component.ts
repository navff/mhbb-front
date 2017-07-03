import { Component, OnInit } from '@angular/core';
import { CityService } from '../../shared/city.service';
import { ReviewService } from '../../shared/review.service';
import { FooterService } from './../../shared/footer.service';

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

  constructor(private reviewService: ReviewService,
              private cityService: CityService,
              private footer: FooterService) {
                this.footer.destroy();
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
    this.reviewService.deleteReview(id)
    .then(result => {
    console.log(result);
    this.reviews[index].state = -1;
    });
  }
  accept(id, index) {
    this.reviewService.putSetChecked(id, 'true')
    .then(result => {
    console.log(result);
    this.reviews[index].state = 1;
    });
  }
  ngOnInit() {
      this.cityService.getCities().then(result => this.cities = result);
      this.reviewService.getUncheckedReviews()
      .then(result => {this.reviews = result;
        this.loaded = true;
        console.log(result);
        this.footer.load();
      });
}}
