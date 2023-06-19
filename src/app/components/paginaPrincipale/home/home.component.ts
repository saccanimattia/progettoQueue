import { Component } from '@angular/core';
import { DatiDispositivoService } from 'src/app/services/dati-dispositivo.service';
import { PocketBaseService } from 'src/app/services/pocket-base.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  id : any
  device : any

  constructor(private pocketBase : PocketBaseService, private salvaDati : DatiDispositivoService){}

  async ngOnInit() : Promise<void>{
    this.pocketBase.setIp()
    this.device = this.salvaDati.getDevice()
    console.log("juiuuuuui")
    console.log(this.device.type)
    if(this.device.type == ''){
      console.log("diund")
      this.pocketBase.setIp()
      console.log("home component prendi device")
      this.id = localStorage.getItem('device')
      console.log(this.id)
      this.device = await this.pocketBase.prendiDeviceId(this.id)
    }
    else{
      const timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => reject('Tempo limite superato'), 2000);
      });

      try {

       await Promise.race([this.pocketBase.prendiDevice(this.device), timeoutPromise]);

        console.log("deviceeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
        console.log(localStorage.getItem('device'));
        // Resto del codice da eseguire dopo aver ottenuto i dati del device
      } catch (error) {
        console.error('Errore durante il recupero delle informazioni:', error);
        // Esegui le azioni di gestione dell'errore qui, ad esempio mostrare un messaggio all'utente
      }
    }

  }
}
