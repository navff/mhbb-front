import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared/_shared.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { AuthGuard } from './shared/auth.guard';
import { Http } from '@angular/http';
import { HttpService } from './shared/services/http.service';
import { UserService } from './shared/services/user.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule
  ],
  declarations: [AppComponent],
  providers: [AuthGuard, HttpService, { provide: Http, useClass: HttpService }, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) { }
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
