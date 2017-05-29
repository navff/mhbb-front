import { Component, OnInit } from '@angular/core';
import { OrganizerService } from '../../../shared/organizer.service';
import { CityService } from '../../../shared/city.service';
import { Response } from '@angular/http';
@Component({
  selector: 'my-admin-organizers-edit',
  templateUrl: './admin-organizers-edit.component.html',
  styleUrls: ['./admin-organizers-edit.component.sass'],
  providers: [OrganizerService, CityService],

})
export class AdminOrganizersEditComponent implements OnInit {
  cities = [];
  selectedCity: string;
  organizer: any = {};
  organizerId = localStorage.getItem('organizerId');
constructor(private organizerService: OrganizerService, private cityService: CityService) {}

ngOnInit() {
  let that = this;
  this.cityService.getCities().subscribe((data: Response) => this.cities = data.json());
  this.organizerService.getOrganizerById(this.organizerId)
  .then(result => this.organizer = result)
  .then(() => that.selectedCity = that.organizer.City.Name);
}
}
