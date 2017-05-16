import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MdButtonModule, MdCheckboxModule, MdInputModule, MdSelectModule, MdIconModule } from '@angular/material';

import { AdminComponent } from './admin.component';
import { AdminMainComponent }     from './admin-main/admin-main.component';
import { AdminContractorsComponent }     from './admin-contractors/admin-contractors.component';
import { AdminUsersComponent }     from './admin-users/admin-users.component';
import { AdminReviewsComponent }     from './admin-reviews/admin-reviews.component';
import { AdminFooterComponent }      from './shared/admin-footer/admin-footer.component';

import { AdminRoutingModule } from './admin-routing.module';


@NgModule({
  imports:      [
    CommonModule,
    FormsModule, HttpModule,
    MdButtonModule, MdCheckboxModule, MdInputModule, MdSelectModule, MdIconModule,
    AdminRoutingModule,
   ],
  declarations: [
    AdminComponent,
    AdminMainComponent,
    AdminContractorsComponent,
    AdminUsersComponent,
    AdminReviewsComponent,
    AdminFooterComponent ]
})
export class AdminModule {}
