import { group } from '@angular/animations';
import { Component } from '@angular/core';
import { DatiDispositivoService } from 'src/app/services/dati-dispositivo.service';
import { PocketBaseService } from 'src/app/services/pocket-base.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('cambioImmagine', [
      state('*', style({ transform: 'translateX(0)' })),
      transition('* <=> *', animate('500ms ease-out'))
    ])
  ]
})
export class HomeComponent {

  id : any
  device : any
  pubblicitaCorrente : any
  risorse : any[] = []

  constructor(private pocketBase : PocketBaseService, private salvaDati : DatiDispositivoService){}

  async ngOnInit() : Promise<void>{
    this.pocketBase.setIp()

    this.device = this.salvaDati.getDevice()
    this.risorse = await this.pocketBase.prendiRisorse();
    console.log("juiuuuuui")
    console.log(this.device.type)
    if(this.device.type == ''){
      console.log("diund")
      this.pocketBase.setIp()
      console.log("home component prendi device")
      this.id = localStorage.getItem('device')
      console.log(this.id)
      this.device = await this.pocketBase.prendiDeviceId(this.id)
      console.log(this.device)
      this.prendiPubb()
    }
    else{
      const timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => reject('Tempo limite superato'), 2000);
      });

      try {

       await Promise.race([this.pocketBase.prendiDevice(this.device), timeoutPromise]);

        console.log("deviceeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
        console.log(localStorage.getItem('device'));
        this.salvaDati.dev()
        this.prendiPubb()
        // Resto del codice da eseguire dopo aver ottenuto i dati del device
      } catch (error) {
        console.error('Errore durante il recupero delle informazioni:', error);
        // Esegui le azioni di gestione dell'errore qui, ad esempio mostrare un messaggio all'utente
      }





    }




  }

  async prendiPubb(){
    console.log("qweasdzxc")
    console.log(this.device)
    console.log("uuusu")
    let pubb : any[] = []
    let i = 0
    if(this.device.spots.length > 0){
        for(let spot of this.device.spots){
          pubb[i]=await this.pocketBase.prendiSpotDaId(spot)
        }
        console.log("uueueueueueueueueueueueeue")

        this.device.spots = pubb
        console.log(this.device.spots)
        this.randomPubblicita()
    }
  }

  randomPubblicita(): void {
    const randomIndex = Math.floor(Math.random() * this.device.spots.length);
    this.pubblicitaCorrente = this.device.spots[randomIndex];
    console.log("pubb correntr")
    console.log(this.pubblicitaCorrente)
    this.convertiMedia()
    console.log(this.pubblicitaCorrente)
    this.avviaCambioImmagini()
  }

  async convertiMedia(){
    let newMedias = [];

      for (let j = 0; j < this.pubblicitaCorrente.medias.length; j++) {
        const m = this.pubblicitaCorrente.medias[j];

        console.log(this.pubblicitaCorrente.medias[j])
        const x = this.pocketBase.prendiRisorsaa(m, this.risorse);
        const id = m;
        const imageUrl = localStorage.getItem('indirizzoIp') + "/api/files/" + x.collectionId + '/' + x.id + '/' + x.file + '?thumb=100x100&token=';
        console.log("link immagine");
        console.log(imageUrl);
        newMedias.push(imageUrl);
      }
      console.log(newMedias)
      this.pubblicitaCorrente.medias = newMedias;
  }



  // Dichiarazione della variabile per l'intervallo
  intervalloCambioImmagini: any;
// Indice corrente dell'immagine
  indiceCorrente: number = 0;
  indiceDopo: number = 0;

// Funzione per avviare il cambio automatico delle immagini
  avviaCambioImmagini(): void {
  // Reset dell'indice corrente all'inizio dell'array se siamo alla fine
  if (this.indiceCorrente === this.pubblicitaCorrente.medias.length - 1) {
    this.indiceCorrente = 0;

  } else {
    this.indiceCorrente++;
  }
  if (this.indiceCorrente+1 === this.pubblicitaCorrente.medias.length - 1) {
    this.indiceDopo = 0;

  } else {
    this.indiceDopo = this.indiceCorrente+1;
  }

  // Avvia un intervallo di tempo di 5 secondi per cambiare l'immagine
  this.intervalloCambioImmagini = setInterval(() => {
    // Cambia l'immagine all'indice corrente
    if (this.indiceCorrente === this.pubblicitaCorrente.medias.length - 1) {
      this.indiceCorrente = 0;

    } else {
      this.indiceCorrente++;
    }
    if (this.indiceDopo === this.pubblicitaCorrente.medias.length - 1) {
      this.indiceDopo = 0;

    } else {
      this.indiceDopo = this.indiceCorrente+1;
    }
  }, 5000);
}

fermaCambioImmagini(): void {
  clearInterval(this.intervalloCambioImmagini);
}


}
