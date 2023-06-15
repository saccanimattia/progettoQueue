import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurazioneComponent } from './components/configurazione/configurazione.component';
import { CiaoComponent } from './ciao/ciao.component';

const routes: Routes = [
  {path:'primaConfigurazione', component:ConfigurazioneComponent},
  {path:'ciao', component:CiaoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
