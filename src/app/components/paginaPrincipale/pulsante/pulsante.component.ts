import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private pocketBase: PocketBaseService) {}

  ngOnInit(): void {
    console.log(this.risorsee)
    this.group = this.gruppo;

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
    this.group.number = this.group.number + 1;
    this.group.queued = this.group.queued + 1;
    this.pocketBase.updateGroup(this.group.id, this.group);

  }
}
