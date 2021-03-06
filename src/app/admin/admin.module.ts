import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin.component';
import { ActEditComponent } from './act-edit/act-edit.component';
import { OrganizersComponent } from './organizers/organizers.component';
import { OrganizerEditComponent } from './organizers/organizer-edit/organizer-edit.component';
import { UsersComponent } from './users/users.component';
import { ReviewsComponent } from './reviews/reviews.component';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/_shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
  ],
  declarations: [
    AdminComponent,
    ActEditComponent,
    OrganizersComponent, OrganizerEditComponent,
    UsersComponent,
    ReviewsComponent
  ]
})
export class AdminModule { }
