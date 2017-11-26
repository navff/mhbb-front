import { Component, OnInit } from '@angular/core';
import { OrganizerService } from '../../shared/services/organizer.service';
import { ListService } from '../../shared/services/list.service';
import { Subject } from 'rxjs/Subject';
import { Organizer } from '../../models/organizer.model';

@Component({
  templateUrl: './organizers.component.html',
  styleUrls: ['./organizers.component.sass'],
  providers: [OrganizerService]
})
export class OrganizersComponent implements OnInit {
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
    this.organizerService.list(this.page.toString(10), this.word, this.city.Id)
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
    this.organizerService.list(this.page.toString(10), this.word, this.city.Id)
      .subscribe((data: Organizer[]) => {
        this.organizers = data;
        this.checkLength = data.length;
      });
  }

  ngOnInit() {
    this.searchWord.debounceTime(250).subscribe(() => this.search());
    this.listService.cities$.subscribe(data => this.cities = data);
    this.organizerService.list()
      .subscribe((data: Organizer[]) => {
        this.organizers = data;
        this.checkLength = data.length;
      });
  }
}
