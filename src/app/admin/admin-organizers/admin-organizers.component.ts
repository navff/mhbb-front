import { Component, OnInit } from '@angular/core';
import { OrganizerService } from '../../shared/organizer.service';

@Component({
  selector: 'my-admin-organizers',
  templateUrl: './admin-organizers.component.html',
  styleUrls: ['./admin-organizers.component.sass'],
  providers: [OrganizerService],
})
export class AdminOrganizersComponent implements OnInit {
  organizers;
  page = 1;
constructor(private organizerService: OrganizerService) {}
  saveOrganizerId(id) {
    localStorage.setItem('organizerId', id);
  }
ngOnInit() {
    this.organizerService.getOrganizersByPage(this.page)
    .then(result => this.organizers = result);
    };
}
