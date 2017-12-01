import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { ActEditComponent } from './act-edit/act-edit.component';
import { OrganizersComponent } from './organizers/organizers.component';
import { OrganizerEditComponent } from './organizers/organizer-edit/organizer-edit.component';
import { UsersComponent } from './users/users.component';
import { ReviewsComponent } from './reviews/reviews.component';

import { MainComponent } from './../shared/components/main/main.component';
import { StaticComponent } from './../shared/components/static/static.component';
import { DetailsComponent } from './../shared/components/details/details.component';
import { UserEditComponent } from './../shared/components/user-edit/user-edit.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', component: MainComponent },
      { path: 'edit', component: UserEditComponent, data: { title: 'Мой профиль' } },
      { path: 'act/:id', component: DetailsComponent },
      { path: 'act/:id/edit', component: ActEditComponent, data: { title: 'Редактирование хобби' } },
      { path: 'organizers', component: OrganizersComponent, data: { title: 'Организаторы' } },
      {
        path: 'organizers/edit/:id', component: OrganizerEditComponent,
        data: { title: 'Редактирование организатора' }
      },
      { path: 'organizers/add', component: OrganizerEditComponent, data: { title: 'Добавление организатора' } },
      { path: 'users', component: UsersComponent, data: { title: 'Пользователи' } },
      { path: 'users/edit', component: UserEditComponent, data: { title: 'Редактирование пользователя' } },
      { path: 'reviews', component: ReviewsComponent, data: { title: 'Отзывы на проверку' } },

      { path: 'addhobby', loadChildren: '../add-hobby/add-hobby.module#AddHobbyModule' },
      { path: '**', component: StaticComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
