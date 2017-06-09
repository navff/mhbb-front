import { Component, OnInit } from '@angular/core';
import { OrganizerService, Organizer } from '../../../shared/organizer.service';
import { CityService } from '../../../shared/city.service';

@Component({
  selector: 'my-admin-organizers-edit',
  templateUrl: './admin-organizers-edit.component.html',
  styleUrls: ['./admin-organizers-edit.component.sass'],
  providers: [OrganizerService, CityService]
})
export class AdminOrganizersEditComponent implements OnInit {
  cities = [];

  organizerCityName: string;
  organizerName: string;
  organizerSobriety: boolean;
  cityId: number;

  organizer: any = {};
  organizerId = localStorage.getItem('organizerId');

constructor(private organizerService: OrganizerService, private cityService: CityService) {}

  putOrganizer() {
    let body = new Organizer(this.organizerName, this.cityId, this.organizerSobriety);
    this.organizerService.putOrganizer(this.organizerId, body)
    .then(result => this.organizer = result);
  }
  saveId(id) {
    this.cityId = id;
  }
  ngOnInit() {
    this.cityService.getCities().then(result => this.cities = result);
    this.organizerService.getOrganizerById(this.organizerId)
    .then(result => {
      this.organizer = result;
      this.organizerCityName = this.organizer.City.Name;
      this.organizerName = this.organizer.Name;
      this.cityId = this.organizer.City.Id;
      this.organizerSobriety = this.organizer.Sobriety;
    });
}}
