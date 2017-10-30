import { Component, OnInit } from '@angular/core';
import { OrganizerService } from '../../shared/services/organizer.service';
import { CityService } from '../../shared/services/city.service';
import { Subject } from 'rxjs/Subject';
import { Organizer } from '../../models/organizer.model';

@Component({
  selector: 'mh-admin-organizers',
  templateUrl: './admin-organizers.component.html',
  styleUrls: ['./admin-organizers.component.sass'],
  providers: [OrganizerService, CityService]
})
export class AdminOrganizersComponent implements OnInit {
  cities = [];
  organizers: Organizer[];

  page = 1;
  word: string;
  searchWord: Subject<any> = new Subject();
  city: any = {};
  checkLength: number;

  responding: boolean;

  constructor(
    private organizerService: OrganizerService,
    private cityService: CityService) { }

  concatPage(): void {
    this.responding = true;
    this.page += 1;
    this.organizerService.getOrganizers(this.page.toString(10), this.word, this.city.Id)
      .subscribe((data: Organizer[]) => {
        this.organizers = this.organizers.concat(data);
        this.checkLength = data.length;
        this.responding = false;
      });
  }
  updateWord(word: string): void {
    this.searchWord.next(word);
  }
  search(): void {
    this.page = 1;
    this.organizerService.getOrganizers(this.page.toString(10), this.word, this.city.Id)
      .subscribe((data: Organizer[]) => {
        this.organizers = data;
        this.checkLength = data.length;
      });
  }

  ngOnInit() {
    this.searchWord.debounceTime(250).distinctUntilChanged().subscribe(() => this.search());
    this.cityService.getCities().subscribe(data => this.cities = data);
    this.organizerService.getOrganizers()
      .subscribe((data: Organizer[]) => {
        this.organizers = data;
        this.checkLength = data.length;
      });
  }
}
