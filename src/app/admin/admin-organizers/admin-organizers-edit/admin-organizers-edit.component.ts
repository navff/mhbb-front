import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrganizerService, Organizer } from '../../../shared/organizer.service';
import { CityService } from '../../../shared/city.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'my-admin-organizers-edit',
  templateUrl: './admin-organizers-edit.component.html',
  styleUrls: ['./admin-organizers-edit.component.sass'],
  providers: [OrganizerService, CityService]
})
export class AdminOrganizersEditComponent implements OnInit {
  cities = [];
  currentUrl: string;
  organizer: any = {};
  organizerId: string;

  responding = false;
  loaded = true;

  editOrganizer: FormGroup;
  constructor(private organizerService: OrganizerService,
              private cityService: CityService,
              private route: ActivatedRoute,
              private router: Router,
              fb: FormBuilder) {
    this.editOrganizer = fb.group({
      'name': '',
      'cityId': '',
      'sobriety': ''
  });
  }

  putOrganizer() {
    if (this.currentUrl !== '/admin/organizers/add') {
    this.responding = true;
    let body = new Organizer(this.editOrganizer.get('name').value,
                             this.editOrganizer.get('cityId').value,
                             this.editOrganizer.get('sobriety').value);
    this.organizerService.putOrganizer(this.organizerId, body)
    .then(result => {this.organizer = result;
      this.router.navigate(['/admin/organizers']);
    });
    } else {
      return;
    }
  }
  ngOnInit() {
    this.currentUrl = this.router.url;
    this.cityService.getCities().then(result => this.cities = result);
    if (this.currentUrl === '/admin/organizers/add') {

    } else {
      this.loaded = false;
      this.route.params.subscribe(params =>  this.organizerId = params['id']);
      this.organizerService.getOrganizerById(this.organizerId)
      .then(result => {
        this.organizer = result;
        this.editOrganizer.get('name').setValue(this.organizer.Name);
        this.editOrganizer.get('cityId').setValue(this.organizer.City.Id);
        this.editOrganizer.get('sobriety').setValue(this.organizer.Sobriety);
        console.log(this.editOrganizer.value);
        this.loaded = true;
      });
    }
}}
