import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared/auth.guard';

export const routes: Routes = [


  { path: '', loadChildren: './user/user.module#UserModule'},
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule', canActivate: [AuthGuard]},
  { path: 'addhobby', loadChildren: './add-hobby/add-hobby.module#AddHobbyModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
