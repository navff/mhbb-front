import { Component, OnInit } from '@angular/core';
import { OrganizerService } from '../../shared/services/organizer.service';
import { CityService } from '../../shared/services/city.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'mh-admin-organizers',
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
  city: any = { id: undefined };
  checkLength: number;

  loaded = false;
  responding = false;

  constructor(
    private organizerService: OrganizerService,
    private cityService: CityService) { }

  concatPage() {
    this.responding = true;
    this.page += 1;
    this.organizerService.getOrganizers(this.page.toString(10), this.word, this.city.Id)
      .subscribe(data => {
        this.organizers = this.organizers.concat(data);
        this.checkLength = data.length;
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
      .subscribe(data => {
        this.organizers = data;
        this.checkLength = data.length;
        this.loaded = true;
      });
  }

  ngOnInit() {
    this.searchWord.debounceTime(300).distinctUntilChanged().subscribe(() => this.search());
    this.cityService.getCities().subscribe(data => this.cities = data);
    this.organizerService.getOrganizers(this.page.toString(10))
      .subscribe(data => {
        this.organizers = data;
        this.checkLength = data.length;
        this.loaded = true;
      });
  }
}
