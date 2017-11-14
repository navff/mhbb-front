import { Component, OnInit } from '@angular/core';
import { CityService } from '../../shared/services/city.service';
import { ReviewService } from '../../shared/services/review.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'mh-admin-reviews',
  templateUrl: './admin-reviews.component.html',
  styleUrls: ['./admin-reviews.component.sass'],
  providers: [ReviewService, CityService]
})
export class AdminReviewsComponent implements OnInit {
  reviews: any[];
  cities = [];
  word: string;
  changes$: Subject<any> = new Subject();
  city: any = {};

  constructor(
    private reviewService: ReviewService,
    private cityService: CityService) { }

  search(): void {
    this.reviewService.getUncheckedReviews(this.word, this.city.Id)
      .subscribe(data => this.reviews = data);
  }
  onChange(): void {
    this.changes$.next();
  }
  reject(id, index): void {
    this.reviews[index].state = 'rejecting';
    this.reviewService.deleteReview(id)
      .subscribe(() => this.reviews[index].state = 'rejected');
  }
  accept(id, index): void {
    this.reviews[index].state = 'accepting';
    this.reviewService.putSetChecked(id, 'true')
      .subscribe(() => this.reviews[index].state = 'accepted');
  }

  ngOnInit() {
    this.changes$.debounceTime(250).subscribe(() => this.search());
    this.cityService.getCities().subscribe(data => this.cities = data);
    this.reviewService.getUncheckedReviews()
      .subscribe(data => this.reviews = data);
  }
}
