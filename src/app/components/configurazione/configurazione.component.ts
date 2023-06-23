import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { DatiDispositivoService } from 'src/app/services/dati-dispositivo.service';



@Component({
  selector: 'app-configurazione',
  templateUrl: './configurazione.component.html',
  styleUrls: ['./configurazione.component.scss']
})
export class ConfigurazioneComponent {

  constructor(private router : Router, private salvadati : DatiDispositivoService){}
  i = 0;

  ngOnInit(){
    localStorage.clear()
    }

  async increment(){
    this.i++
    if(this.i==2){
      this.router.navigate(['/paginaPrincipale']);
    }

  }




}
