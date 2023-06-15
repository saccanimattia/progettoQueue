import { Component } from '@angular/core';
import { PocketBaseService } from 'src/app/services/pocket-base.service';


@Component({
  selector: 'app-configurazione',
  templateUrl: './configurazione.component.html',
  styleUrls: ['./configurazione.component.scss']
})
export class ConfigurazioneComponent {
  ipAddress: any;


  constructor(private pocketBase : PocketBaseService){

  }

  async submitForm() {
    // Puoi gestire qui la logica per inviare l'indirizzo IP del server del database
    localStorage.setItem('indirizzoIp', this.ipAddress)
    this.pocketBase.setIp()
    console.log( )
    if(await this.pocketBase.checkIp()){
      return 1
    }
    return 0
  }
}
