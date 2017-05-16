import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { EnterComponent } from './enter/enter.component';
import { EnterSuccessComponent } from './enter/enter-success/enter-success.component';
import { DetailsComponent } from './details/details.component';
import { ReservationComponent } from './details/reservation/reservation.component';
import { ReservationSuccessComponent } from './details/reservation/reservation-success/reservation-success.component';
import { AddHobbyComponent } from './add-hobby/add-hobby.component';
import { AddHobbySuccessComponent } from './add-hobby/add-hobby-success/add-hobby-success.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'enter', component: EnterComponent },
  { path: 'enter/entersuccess', component: EnterSuccessComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'details/reservation', component: ReservationComponent },
  { path: 'details/reservation/reservationsuccess', component: ReservationSuccessComponent },
  { path: 'addhobby', component: AddHobbyComponent },
  { path: 'addhobby/addhobbysuccess', component: AddHobbySuccessComponent },

  { path: 'admin', loadChildren: './admin/admin.module#AdminModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
