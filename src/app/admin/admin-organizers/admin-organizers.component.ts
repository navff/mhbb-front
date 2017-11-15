import { Component, OnInit } from '@angular/core';
import { OrganizerService } from '../../shared/services/organizer.service';
import { ListService } from '../../shared/services/list.service';
import { Subject } from 'rxjs/Subject';
import { Organizer } from '../../models/organizer.model';

@Component({
  templateUrl: './admin-organizers.component.html',
  styleUrls: ['./admin-organizers.component.sass'],
  providers: [OrganizerService, ListService]
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
    private listService: ListService) { }

  concatPage() {
    this.responding = true;
    this.page++;
    this.organizerService.getOrganizers(this.page.toString(10), this.word, this.city.Id)
      .subscribe((data: Organizer[]) => {
        this.organizers = this.organizers.concat(data);
        this.checkLength = data.length;
        this.responding = false;
      });
  }
  updateWord(word: string) {
    this.searchWord.next(word);
  }
  search() {
    this.page = 1;
    this.organizerService.getOrganizers(this.page.toString(10), this.word, this.city.Id)
      .subscribe((data: Organizer[]) => {
        this.organizers = data;
        this.checkLength = data.length;
      });
  }

  ngOnInit() {
    this.searchWord.debounceTime(250).subscribe(() => this.search());
    this.listService.getCities().subscribe(data => this.cities = data);
    this.organizerService.getOrganizers()
      .subscribe((data: Organizer[]) => {
        this.organizers = data;
        this.checkLength = data.length;
      });
  }
}
