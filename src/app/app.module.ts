import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ClientIdInterceptor } from './interceptors/clientid.interceptor';
import { KleedkamerPipe } from './pipes/kleedkamer.pipe';
import { VeldPipe } from './pipes/veld.pipe';
import { WedstrijdComponent } from './wedstrijd/wedstrijd.component';

@NgModule({
  declarations: [
    AppComponent,
    KleedkamerPipe,
    VeldPipe,
    WedstrijdComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ClientIdInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
