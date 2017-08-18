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
  reviews = [];
  cities = [];
  word: string;
  searchWord: Subject<string> = new Subject();
  city: any = { id: undefined };
  loaded = false;
  responding: number;

  constructor(private reviewService: ReviewService,
    private cityService: CityService) { }

  search() {
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
  delete(id, index) {
    this.responding = index;
    this.reviewService.deleteReview(id)
      .subscribe(() => {
        this.reviews[index].state = -1;
        this.responding = null;
      });
  }
  accept(id, index) {
    this.responding = index;
    this.reviewService.putSetChecked(id, 'true')
      .subscribe(() => {
        this.reviews[index].state = 1;
        this.responding = null;
      });
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
