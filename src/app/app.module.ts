import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfigurazioneComponent } from './components/configurazione/configurazione.component';
import { FormsModule } from '@angular/forms';
import { IndirizzoIpComponent } from './components/modalConfigurazione/indirizzo-ip/indirizzo-ip.component';
import { CategorieComponent } from './components/modalConfigurazione/categorie/categorie.component';
import { HomeComponent } from './components/paginaPrincipale/home/home.component';
import { TypeComponent } from './components/modalConfigurazione/type/type.component';
import { SpotComponent } from './components/modalConfigurazione/spot/spot.component';
import { PulsanteComponent } from './components/paginaPrincipale/pulsante/pulsante.component';
import { TitleComponent } from './components/modalConfigurazione/title/title.component';
import { MaxNumberComponent } from './components/modalConfigurazione/max-number/max-number.component';
import { PrinterComponent } from './components/modalConfigurazione/printer/printer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [
    AppComponent,
    ConfigurazioneComponent,
    IndirizzoIpComponent,
    CategorieComponent,
    HomeComponent,
    TypeComponent,
    SpotComponent,
    PulsanteComponent,
    TitleComponent,
    MaxNumberComponent,
    PrinterComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
