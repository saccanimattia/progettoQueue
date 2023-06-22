import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfigurazioneComponent } from './components/configurazione/configurazione.component';
import { FormsModule } from '@angular/forms';
import { IndirizzoIpComponent } from './components/modalConfigurazione/indirizzo-ip/indirizzo-ip.component';

import { HomeComponent } from './components/paginaPrincipale/home/home.component';
import { PulsanteComponent } from './components/paginaPrincipale/pulsante/pulsante.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutComponent } from './components/modalConfigurazione/layout/layout.component';





@NgModule({
  declarations: [
    AppComponent,
    ConfigurazioneComponent,
    IndirizzoIpComponent,
    HomeComponent,
    PulsanteComponent,
    LayoutComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
