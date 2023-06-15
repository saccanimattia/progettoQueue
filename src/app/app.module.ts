import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfigurazioneComponent } from './components/configurazione/configurazione.component';
import { FormsModule } from '@angular/forms';
import { CiaoComponent } from './ciao/ciao.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfigurazioneComponent,
    CiaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
