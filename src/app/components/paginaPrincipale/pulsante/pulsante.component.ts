import { Component, Input, OnInit } from '@angular/core';
import { DatiDispositivoService } from 'src/app/services/dati-dispositivo.service';
import { PocketBaseService } from 'src/app/services/pocket-base.service';
import PocketBase from 'pocketbase';

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
  timeoutLimit = 5000;
  max : any
  pb : any

  constructor(private pocketBase: PocketBaseService, private dati : DatiDispositivoService) {}

  ngOnInit(): void {
    this.group = this.gruppo;
    console.log(this.group)

    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => reject('Tempo limite superato'), this.timeoutLimit);
    });
    Promise.race([this.pocketBase.prendiCategoriaId(this.gruppo), timeoutPromise])
      .then((groupData: any) => {
        this.group = groupData;
        this.max = this.group.maxNumber
        return this.pocketBase.prendiRisorsaa(this.group.image, this.risorsee);
      })
      .then((xData: any) => {
        this.x = xData;
        this.img = localStorage.getItem('indirizzoIp') + "/api/files/" + this.x.collectionId + '/' + this.x.id + '/' + this.x.file + '?thumb=100x100&token=';
        const ipAddress = localStorage.getItem('indirizzoIp')!;
      this.pb = new PocketBase(ipAddress);

      console.log('palle');

      console.log(this.group.id)
      this.pb.collection('groups').subscribe(this.group.id, (e:any) => {
        this.group.number = e.record.number;
        this.group.queued = e.record.queued;
    });
      })
      .catch((error) => {
        console.error('Errore durante il recupero delle informazioni:', error);
      });

  }

  async add(): Promise<void> {
    let print = localStorage.getItem('printer')
    console.log(this.group.id)
    let _body =  JSON.stringify({
      groupId: this.group.id,
      printerId: print})
    await fetch("http://192.168.130.49:3000/print", {
      method:"post",
      headers: {"Content-Type": "application/json"},
      body: _body
      })
      console.log(this.group.id)
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
