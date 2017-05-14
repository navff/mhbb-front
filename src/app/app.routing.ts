import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { EnterComponent } from './enter/enter.component';
import { DetailsComponent } from './details/details.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ReservationSuccessComponent } from './reservation/reservation-success/reservation-success.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'enter', component: EnterComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'details/reservation', component: ReservationComponent },
  { path: 'details/reservation/reservationsuccess', component: ReservationSuccessComponent }
];

export const routing = RouterModule.forRoot(routes);
