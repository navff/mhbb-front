import { Component, OnInit } from '@angular/core';
import { ListService } from '../../shared/services/list.service';
import { ReviewService } from '../../shared/services/review.service';
import { Subject } from 'rxjs/Subject';

@Component({
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.sass'],
  providers: [ReviewService]
})
export class ReviewsComponent implements OnInit {
  reviews: any[];
  cities = [];
  params = {};
  changes$ = new Subject();

  constructor(
    private reviewService: ReviewService,
    private listService: ListService) { }

  search() {
    this.reviewService.listUnchecked(this.params)
      .subscribe(data => this.reviews = data);
  }
  onChange() {
    this.changes$.next();
  }
  reject(id, index) {
    this.reviews[index].state = 'rejecting';
    this.reviewService.remove(id)
      .subscribe(() => this.reviews[index].state = 'rejected');
  }
  accept(id, index) {
    this.reviews[index].state = 'accepting';
    this.reviewService.setCheck(id, 'true')
      .subscribe(() => this.reviews[index].state = 'accepted');
  }

  ngOnInit() {
    this.changes$.debounceTime(250).subscribe(() => this.search());
    this.listService.cities$.subscribe(data => this.cities = data);
    this.search();
  }
}
