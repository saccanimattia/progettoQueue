import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurazioneComponent } from './components/configurazione/configurazione.component';
import { HomeComponent } from './components/paginaPrincipale/home/home.component';
import { emptyLocalStorageGuard } from './guard/empty-local-storage.guard';

const routes: Routes = [
  {
    path: 'paginaProteggi',
    component: HomeComponent,
    canActivate: [emptyLocalStorageGuard],
  },
  {
    path: 'primaConfigurazione',
    component: ConfigurazioneComponent,
  },
  {
    path: 'paginaPrincipale',
    component: HomeComponent,
    canActivate: [emptyLocalStorageGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
