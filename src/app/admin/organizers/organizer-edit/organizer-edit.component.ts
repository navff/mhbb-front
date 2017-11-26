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
  organizerId: string;
  form: FormGroup;

  responding: string;

  addPage = location.pathname === '/admin/organizers/add';

  constructor(
    private organizerService: OrganizerService,
    private listService: ListService,
    private route: ActivatedRoute,
    private router: Router,
    fb: FormBuilder) {
    this.form = fb.group({
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
      this.form.get('name').value,
      this.form.get('cityId').value,
      this.form.get('sobriety').value,
      this.form.get('email').value,
      this.form.get('phone').value);

    let request = this.addPage ?
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
    this.listService.cities$.subscribe(data => this.cities = data);
    if (!this.addPage) {
      this.route.params.switchMap(params => this.organizerService.take(params.id))
        .subscribe((data: Organizer) => {
          this.organizerId = data.Id;
          this.form.get('name').setValue(data.Name);
          this.form.get('cityId').setValue(data.CityId);
          this.form.get('sobriety').setValue(data.Sobriety);
          this.form.get('email').setValue(data.Email);
          this.form.get('phone').setValue(data.Phone);
        });
    }
  }
}
