import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurazioneComponent } from './components/configurazione/configurazione.component';

const routes: Routes = [
  {path:'primaConfigurazione', component:ConfigurazioneComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
