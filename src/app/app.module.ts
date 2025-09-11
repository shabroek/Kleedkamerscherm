import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { ProgrammaComponent } from "./components/programma/programma.component";
import { WedstrijdCardComponent } from "./components/programma/wedstrijd-card.component";
import { WedstrijdRowComponent } from "./components/programma/wedstrijd-row.component";
import { UitslagenComponent } from "./components/uitslagen/uitslagen.component";
import { ClientIdInterceptor } from "./interceptors/clientid.interceptor";
import { KleedkamerPipe } from "./pipes/kleedkamer.pipe";
import { VeldPipe } from "./pipes/veld.pipe";
import { VeldTypePipe } from "./pipes/veldtype.pipe";

@NgModule({
  declarations: [
    AppComponent,
    KleedkamerPipe,
    VeldPipe,
    VeldTypePipe,
    ProgrammaComponent,
    UitslagenComponent,
    WedstrijdRowComponent,
    WedstrijdCardComponent,
  ],
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot([])],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ClientIdInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
