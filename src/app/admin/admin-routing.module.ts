import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent }       from './admin.component';
import { AdminMainComponent }     from './admin-main/admin-main.component';
import { AdminContractorsComponent }     from './admin-contractors/admin-contractors.component';
import { AdminUsersComponent }     from './admin-users/admin-users.component';
import { AdminReviewsComponent }     from './admin-reviews/admin-reviews.component';

const routes: Routes = [
  { path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full'},
      { path: 'main',   component: AdminMainComponent },
      { path: 'contractors', component: AdminContractorsComponent },
      { path: 'users', component: AdminUsersComponent },
      { path: 'reviews', component: AdminReviewsComponent }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
