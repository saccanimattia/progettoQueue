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
import { SpotComponent } from './components/modalConfigurazione/indirizzo-ip/spot/spot.component';



@NgModule({
  declarations: [
    AppComponent,
    ConfigurazioneComponent,
    IndirizzoIpComponent,
    CategorieComponent,
    HomeComponent,
    TypeComponent,
    SpotComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
