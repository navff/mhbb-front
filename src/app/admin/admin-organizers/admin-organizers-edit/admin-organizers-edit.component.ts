import { Component, OnInit } from '@angular/core';
import { OrganizerService } from '../../../shared/organizer.service';
import { CityService } from '../../../shared/city.service';
import { Response } from '@angular/http';
@Component({
  selector: 'my-admin-organizers-edit',
  templateUrl: './admin-organizers-edit.component.html',
  styleUrls: ['./admin-organizers-edit.component.sass'],
  providers: [OrganizerService],

})
export class AdminOrganizersEditComponent implements OnInit {
  cities = [];
  organizer: any = {};
  selectedCity: string;
  organizerId = parseInt(localStorage.getItem('organizerId'), 10);
constructor(private organizerService: OrganizerService,
            private cityService: CityService) {}

ngOnInit() {
  let that = this;
  this.cityService.getAllCities().subscribe((data: Response) => this.cities = data.json());
  this.organizerService.getOrganizerById(this.organizerId)
  .then(result => this.organizer = result)
  .then(() => that.selectedCity = that.organizer.City.Name);
}
}