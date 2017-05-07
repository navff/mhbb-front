import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { EnterComponent } from './enter/enter.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'enter', component: EnterComponent}
];

export const routing = RouterModule.forRoot(routes);
