import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  organizer: any = {};
  organizerId = localStorage.getItem('organizerId');

  editOrganizer: FormGroup;
  constructor(private organizerService: OrganizerService,
              private cityService: CityService,
              fb: FormBuilder) {
    this.editOrganizer = fb.group({
      'name': '',
      'cityId': '',
      'sobriety': ''
  });
  }

  putOrganizer() {
    let body = new Organizer(this.editOrganizer.get('name').value,
                             this.editOrganizer.get('cityId').value,
                             this.editOrganizer.get('sobriety').value);
    this.organizerService.putOrganizer(this.organizerId, body)
    .then(result => this.organizer = result);
  }
  ngOnInit() {
    this.cityService.getCities().then(result => this.cities = result);
    this.organizerService.getOrganizerById(this.organizerId)
    .then(result => {
      this.organizer = result;
      this.editOrganizer.get('name').setValue(this.organizer.Name);
      this.editOrganizer.get('cityId').setValue(this.organizer.City.Id);
      this.editOrganizer.get('sobriety').setValue(this.organizer.Sobriety);
      console.log(this.editOrganizer.value);
    });
}}
