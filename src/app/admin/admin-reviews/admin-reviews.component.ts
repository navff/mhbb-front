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
  reviews: any[] = [];
  cities = [];
  word: string;
  searchWord: Subject<any> = new Subject();
  city: any = {};
  loaded: boolean;

  constructor(
    private reviewService: ReviewService,
    private cityService: CityService) { }

  search(): void {
    this.loaded = false;
    this.reviewService.getUncheckedReviews(this.word, this.city.Id)
      .subscribe(data => {
        this.reviews = data;
        this.loaded = true;
      });
  }
  updateWord(word: string): void {
    this.searchWord.next(word);
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
    this.searchWord.debounceTime(300).distinctUntilChanged().subscribe(() => this.search());
    this.cityService.getCities().subscribe(data => this.cities = data);
    this.reviewService.getUncheckedReviews()
      .subscribe(data => {
        this.reviews = data;
        this.loaded = true;
      });
  }
}
