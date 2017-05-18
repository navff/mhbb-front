import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { AdminComponent } from './admin.component';
import { AdminMainComponent }     from './admin-main/admin-main.component';
import { AdminContractorsComponent }     from './admin-contractors/admin-contractors.component';
import { AdminContractorsEditComponent }     from './admin-contractors/admin-contractors-edit/admin-contractors-edit.component';
import { AdminUsersComponent }     from './admin-users/admin-users.component';
import { AdminUsersEditComponent }     from './admin-users/admin-users-edit/admin-users-edit.component';
import { AdminReviewsComponent }     from './admin-reviews/admin-reviews.component';
import { AdminFooterComponent }      from './shared/admin-footer/admin-footer.component';

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
    AdminContractorsComponent, AdminContractorsEditComponent,
    AdminUsersComponent, AdminUsersEditComponent,
    AdminReviewsComponent,
    AdminFooterComponent,
   ]
})
export class AdminModule {}
