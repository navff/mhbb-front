import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCheckboxModule, MdInputModule, MdSelectModule, MdIconModule } from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EnterComponent } from './enter/enter.component';
import { EnterSuccessComponent } from './enter/enter-success/enter-success.component';
import { DetailsComponent } from './details/details.component';
import { ReservationComponent } from './details/reservation/reservation.component';
import { ReservationSuccessComponent } from './details/reservation/reservation-success/reservation-success.component';
import { AddHobbyComponent } from './add-hobby/add-hobby.component';
import { AddHobbySuccessComponent } from './add-hobby/add-hobby-success/add-hobby-success.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { routing } from './app.routing';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
    BrowserAnimationsModule,
    MdCheckboxModule, MdInputModule, MdSelectModule, MdIconModule, MdButtonModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    EnterComponent,
    EnterSuccessComponent,
    DetailsComponent,
    ReservationComponent,
    ReservationSuccessComponent,
    AddHobbyComponent,
    AddHobbySuccessComponent,
    HeaderComponent,
    FooterComponent
  ],
  bootstrap: [AppComponent]
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
