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

  params = {
    page: 1,
  };
  searchWord = new Subject();

  constructor(
    private organizerService: OrganizerService,
    private listService: ListService) { }

  onChange() {
    this.searchWord.next();
  }
  search() {
    this.organizerService.list(this.params)
      .subscribe(data => this.organizers = data);
  }

  ngOnInit() {
    this.searchWord.debounceTime(250).subscribe(() => this.search());
    this.listService.cities$.subscribe(data => this.cities = data);
    this.search();
  }
}
