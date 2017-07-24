import { Component, OnInit } from '@angular/core';
import { OrganizerService } from '../../shared/services/organizer.service';
import { CityService } from '../../shared/services/city.service';
import { SharedService } from './../../shared/services/shared.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'my-admin-organizers',
  templateUrl: './admin-organizers.component.html',
  styleUrls: ['./admin-organizers.component.sass'],
  providers: [OrganizerService, CityService]
})
export class AdminOrganizersComponent implements OnInit {
  cities = [];
  organizers = [];

  page = 1;
  word: string;
  searchWord: Subject<string> = new Subject();
  city: any = {id: undefined};
  checkLength: number;

  loaded = false;
  responding = false;
  constructor(
    private organizerService: OrganizerService,
    private cityService: CityService,
    private shared: SharedService) {
    this.shared.destroyFooter();
  }

  concatPage() {
    this.responding = true;
    this.page += 1;
    this.organizerService.getOrganizers(this.page.toString(10), this.word, this.city.Id)
      .then(result => {
        this.organizers = this.organizers.concat(result);
        this.checkLength = result.length;
        this.responding = false;
      });
  }
  reset() {
    this.page = 1;
    this.organizers = [];
    this.loaded = false;
    this.checkLength = 0;
  }
  updateWord(word: string): void {
    this.searchWord.next(word);
  }
  search() {
    this.reset();
    this.organizerService.getOrganizers(this.page.toString(10), this.word, this.city.Id)
      .then(result => {
        this.organizers = result;
        this.checkLength = result.length;
        this.loaded = true;
      });
  }

  ngOnInit() {
    this.searchWord.debounceTime(300).distinctUntilChanged().subscribe(() => this.search());
    this.cityService.getCities().then(result => this.cities = result);
    this.organizerService.getOrganizers(this.page.toString(10))
      .then(result => {
        this.organizers = result;
        this.checkLength = result.length;
        this.loaded = true;
        this.shared.loadFooter();
      });
  }
}
