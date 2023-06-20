import { Component, Input, OnInit } from '@angular/core';
import { DatiDispositivoService } from 'src/app/services/dati-dispositivo.service';
import { PocketBaseService } from 'src/app/services/pocket-base.service';

@Component({
  selector: 'app-pulsante',
  templateUrl: './pulsante.component.html',
  styleUrls: ['./pulsante.component.scss']
})
export class PulsanteComponent implements OnInit {
  @Input() gruppo: any;
  @Input() risorsee: any[] = [];
  group: any = undefined;
  x: any;
  img: any;
  timeoutLimit = 5000; // Tempo limite in millisecondi (es. 5000 = 5 secondi)
  max = 0

  constructor(private pocketBase: PocketBaseService, private dati : DatiDispositivoService) {}

  ngOnInit(): void {
    console.log(this.risorsee)
    this.group = this.gruppo;
    this.max = this.dati.getMaxNumber()
    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => reject('Tempo limite superato'), this.timeoutLimit);
    });

    Promise.race([this.pocketBase.prendiCategoriaId(this.gruppo), timeoutPromise])
      .then((groupData: any) => {

        this.group = groupData;

        return this.pocketBase.prendiRisorsaa(this.group.image, this.risorsee);
      })
      .then((xData: any) => {

        this.x = xData;
        this.img = localStorage.getItem('indirizzoIp') + "/api/files/" + this.x.collectionId + '/' + this.x.id + '/' + this.x.file + '?thumb=100x100&token=';
      })
      .catch((error) => {
        console.error('Errore durante il recupero delle informazioni:', error);
        // Esegui le azioni di gestione dell'errore qui, ad esempio mostrare un messaggio all'utente
      });
      // ... parte del tuo codice ...

// Controlla se group?.number esiste e se è un numero




  }

  add(): void {
    if(this.group.number + 1 > this.max){
      this.group.number = 0
    }
    else{
      this.group.number = this.group.number + 1;
    }
    this.group.queued = this.group.queued + 1;
    this.pocketBase.updateGroup(this.group.id, this.group);

  }
}
