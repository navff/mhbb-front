import { Component, OnInit } from '@angular/core';
import { CityService } from '../../shared/services/city.service';
import { ReviewService } from '../../shared/services/review.service';
import { SharedService } from './../../shared/services/shared.service';
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
  city: any = {id: undefined};
  loaded = false;
  responding: number;

  constructor(private reviewService: ReviewService,
    private cityService: CityService,
    private shared: SharedService) {
    this.shared.destroyFooter();
  }

  search() {
    this.loaded = false;
    this.reviewService.getUncheckedReviews(this.word, this.city.Id)
      .then(result => {
        this.reviews = result;
        this.loaded = true;
      });
  }
  updateWord(word: string): void {
    this.searchWord.next(word);
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
    this.searchWord.debounceTime(300).distinctUntilChanged().subscribe(() => this.search());
    this.cityService.getCities().then(result => this.cities = result);
    this.reviewService.getUncheckedReviews()
      .then(result => {
        this.reviews = result;
        this.loaded = true;
        console.log(result);
        this.shared.loadFooter();
      });
  }
}
