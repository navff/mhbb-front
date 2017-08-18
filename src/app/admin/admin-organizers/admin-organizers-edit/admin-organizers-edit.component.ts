import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganizerService } from '../../../shared/services/organizer.service';
import { Organizer } from '../../../models/organizer.model';
import { CityService } from '../../../shared/services/city.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'mh-admin-organizers-edit',
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
  constructor(
    private organizerService: OrganizerService,
    private cityService: CityService,
    private route: ActivatedRoute,
    private router: Router,
    fb: FormBuilder) {
    this.editOrganizer = fb.group({
      'name': ['', Validators.required],
      'cityId': ['', Validators.required],
      'sobriety': '',
      'email': '',
      'phone': ''
    });
  }

  putOrganizer() {
    if (this.currentUrl !== '/admin/organizers/add') {
      this.responding = true;
      let body = new Organizer(
        this.editOrganizer.get('name').value,
        this.editOrganizer.get('cityId').value,
        this.editOrganizer.get('sobriety').value,
        this.editOrganizer.get('email').value,
        this.editOrganizer.get('phone').value);
      this.organizerService.putOrganizer(this.organizerId, body)
        .subscribe(data => {
          this.organizer = data;
          this.router.navigate(['/admin/organizers']);
        });
    } else {
      this.responding = true;
      let body = new Organizer(
        this.editOrganizer.get('name').value,
        this.editOrganizer.get('cityId').value,
        this.editOrganizer.get('sobriety').value,
        this.editOrganizer.get('email').value,
        this.editOrganizer.get('phone').value);
      this.organizerService.postOrganizer(body)
        .subscribe(data => {
          this.organizer = data;
          this.router.navigate(['/admin/organizers']);
        });
    }
  }
  ngOnInit() {
    this.currentUrl = this.router.url;
    this.cityService.getCities().subscribe(data => this.cities = data);
    if (this.currentUrl === '/admin/organizers/add') {

    } else {
      this.loaded = false;
      this.route.params.subscribe(params => this.organizerId = params['id']);
      this.organizerService.getOrganizerById(this.organizerId)
        .subscribe(data => {
          this.organizer = data;
          this.editOrganizer.get('name').setValue(this.organizer.Name);
          this.editOrganizer.get('cityId').setValue(this.organizer.City.Id);
          this.editOrganizer.get('sobriety').setValue(this.organizer.Sobriety);
          this.editOrganizer.get('email').setValue(this.organizer.Email);
          this.editOrganizer.get('phone').setValue(this.organizer.Phone);
          this.loaded = true;
        });
    }
  }
}
