import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurazioneComponent } from './components/configurazione/configurazione.component';
import { HomeComponent } from './components/paginaPrincipale/home/home.component';


const routes: Routes = [
  {path:'primaConfigurazione', component:ConfigurazioneComponent},
  {path:'paginaPrincipale', component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
