import { Component, OnInit } from '@angular/core';
import { OrganizerService } from '../../../shared/services/organizer.service';
import { ListService } from '../../../shared/services/list.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Organizer } from './../../../models/organizer.model';

@Component({
  templateUrl: './organizer-edit.component.html',
  styleUrls: ['./organizer-edit.component.sass'],
  providers: [OrganizerService]
})
export class OrganizerEditComponent implements OnInit {
  cities = [];
  organizer = new Organizer();
  organizerId;

  responding: string;

  addPage = location.pathname === '/admin/organizers/add';

  constructor(
    private organizerService: OrganizerService,
    private listService: ListService,
    private route: ActivatedRoute,
    private router: Router) {
    // this.form = fb.group({
    //   name: ['', Validators.required],
    //   cityId: ['', Validators.required],
    //   sobriety: false,
    //   email: '',
    //   phone: ''
    // });
  }

  post() {
    this.responding = 'put';
    let request = this.addPage ?
      this.organizerService.create(this.organizer) :
      this.organizerService.update(this.organizerId, this.organizer);
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
        .subscribe(data => {
          this.organizer = new Organizer(data);
          this.organizerId = data.Id;
        });
    }
  }
}
