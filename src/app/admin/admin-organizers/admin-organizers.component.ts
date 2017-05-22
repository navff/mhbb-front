import { Component, OnInit } from '@angular/core';
import { OrganizerService } from '../../shared/organizer.service';
import { SharedIdService } from '../../shared/shared-id.service';

@Component({
  selector: 'my-admin-organizers',
  templateUrl: './admin-organizers.component.html',
  styleUrls: ['./admin-organizers.component.sass'],
  providers: [OrganizerService],
})
export class AdminOrganizersComponent implements OnInit {
  organizers;
  page = 1;
constructor(private organizerService: OrganizerService, private sharedIdService: SharedIdService) {}
saveId(id) {
  this.sharedIdService.setId(id);
}
ngOnInit() {
    this.organizerService.getOrganizersByPage(this.page)
    .then(result => this.organizers = result);
    };
}
