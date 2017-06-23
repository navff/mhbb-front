import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared/_shared.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EnterComponent } from './enter/enter.component';
import { EnterSuccessComponent } from './enter/enter-success/enter-success.component';
import { DetailsComponent } from './details/details.component';
import { ReservationComponent } from './details/reservation/reservation.component';
import { ReservationSuccessComponent } from './details/reservation/reservation-success/reservation-success.component';
import { UserEditComponent } from './user-edit/user-edit.component';

import { AppRoutingModule } from './app-routing.module';


import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { AuthGuard } from './shared/auth.guard';
import { AuthService } from './shared/auth.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    EnterComponent, EnterSuccessComponent,
    DetailsComponent, ReservationComponent, ReservationSuccessComponent,
    UserEditComponent
  ],
  providers: [ AuthGuard, AuthService ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
