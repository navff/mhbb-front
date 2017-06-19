import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { EnterComponent } from './enter/enter.component';
import { EnterSuccessComponent } from './enter/enter-success/enter-success.component';
import { DetailsComponent } from './details/details.component';
import { ReservationComponent } from './details/reservation/reservation.component';
import { ReservationSuccessComponent } from './details/reservation/reservation-success/reservation-success.component';
import { AuthGuard } from './shared/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'enter', component: EnterComponent },
  { path: 'enter/entersuccess', component: EnterSuccessComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'details/reservation', component: ReservationComponent },
  { path: 'details/reservation/reservationsuccess', component: ReservationSuccessComponent },

  { path: 'admin', loadChildren: './admin/admin.module#AdminModule', canActivate: [AuthGuard]},
  { path: 'addhobby', loadChildren: './add-hobby/add-hobby.module#AddHobbyModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
