import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { AdminComponent } from './admin.component';
import { AdminMainComponent }     from './admin-main/admin-main.component';
import { AdminOrganizersComponent }     from './admin-organizers/admin-organizers.component';
import { AdminOrganizersEditComponent }     from './admin-organizers/admin-organizers-edit/admin-organizers-edit.component';
import { AdminUsersComponent }     from './admin-users/admin-users.component';
import { AdminUsersEditComponent }     from './admin-users/admin-users-edit/admin-users-edit.component';
import { AdminReviewsComponent }     from './admin-reviews/admin-reviews.component';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports:      [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
   ],
  declarations: [
    AdminComponent,
    AdminMainComponent,
    AdminOrganizersComponent, AdminOrganizersEditComponent,
    AdminUsersComponent, AdminUsersEditComponent,
    AdminReviewsComponent
   ]
})
export class AdminModule {}
