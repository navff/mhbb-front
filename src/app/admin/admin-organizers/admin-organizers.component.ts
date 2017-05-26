import { Component, OnInit } from '@angular/core';
import { OrganizerService } from '../../shared/organizer.service';
import { CityService } from '../../shared/city.service';
import { Response } from '@angular/http';

@Component({
  selector: 'my-admin-organizers',
  templateUrl: './admin-organizers.component.html',
  styleUrls: ['./admin-organizers.component.sass'],
  providers: [OrganizerService, CityService],
})
export class AdminOrganizersComponent implements OnInit {
  cities = [];
  organizers;
  page = 1;
constructor(private organizerService: OrganizerService, private cityService: CityService) {}
  saveOrganizerId(id) {
    localStorage.setItem('organizerId', id);
  }
ngOnInit() {
    this.cityService.getCities().subscribe((data: Response) => this.cities = data.json());
    this.organizerService.getOrganizersByPage(this.page)
    .then(result => this.organizers = result);
    };
}
