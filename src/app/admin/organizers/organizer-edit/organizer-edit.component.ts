import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganizerService } from '../../../shared/services/organizer.service';
import { Organizer } from '../../../models/organizer.model';
import { ListService } from '../../../shared/services/list.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  templateUrl: './organizer-edit.component.html',
  styleUrls: ['./organizer-edit.component.sass'],
  providers: [OrganizerService]
})
export class OrganizerEditComponent implements OnInit {
  cities = [];
  url: string;
  organizerId: string;

  responding: string;

  editOrganizer: FormGroup;
  constructor(
    private organizerService: OrganizerService,
    private listService: ListService,
    private route: ActivatedRoute,
    private router: Router,
    fb: FormBuilder) {
    this.editOrganizer = fb.group({
      name: ['', Validators.required],
      cityId: ['', Validators.required],
      sobriety: false,
      email: '',
      phone: ''
    });
  }

  update() {
    this.responding = 'put';
    let body = new Organizer(
      this.editOrganizer.get('name').value,
      this.editOrganizer.get('cityId').value,
      this.editOrganizer.get('sobriety').value,
      this.editOrganizer.get('email').value,
      this.editOrganizer.get('phone').value);

    let request = this.url === '/admin/organizers/add' ?
      this.organizerService.create(body) :
      this.organizerService.update(this.organizerId, body);
    request.subscribe(() => this.router.navigate(['/admin/organizers']));
  }
  remove() {
    this.responding = 'delete';
    this.organizerService.remove(this.organizerId)
      .subscribe(() => this.router.navigate(['/admin/organizers']));
  }

  ngOnInit() {
    this.url = this.router.url;
    this.listService.cities$.subscribe(data => this.cities = data);
    if (this.url !== '/admin/organizers/add') {
      this.route.params.subscribe(params => this.organizerId = params.id);
      this.organizerService.take(this.organizerId)
        .subscribe((data: Organizer) => {
          this.editOrganizer.get('name').setValue(data.Name);
          this.editOrganizer.get('cityId').setValue(data.CityId);
          this.editOrganizer.get('sobriety').setValue(data.Sobriety);
          this.editOrganizer.get('email').setValue(data.Email);
          this.editOrganizer.get('phone').setValue(data.Phone);
        });
    }
  }
}
