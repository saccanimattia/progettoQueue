import { Injectable } from '@angular/core';
import { PocketBaseService } from './pocket-base.service';

@Injectable({
  providedIn: 'root'
})
export class DatiDispositivoService {

  ip : any
  device = {
    name : '',
    groups : [],
    type : '',
    spots : []
  }
  constructor(private pocketBase : PocketBaseService) { }

  setIp(){
    this.ip = localStorage.getItem('indirizzoIp')!
  }

  getIp(){
    return this.ip
  }

  setType(tipo : any){
    this.device.type = tipo.toLowerCase()
  }

  getType(){
    return this.device.type
  }

  setCategories(c : any){
    this.device.groups = c
  }

  getCategories(){
    return this.device.groups
  }

  setSpot(s : any){
    this.device.spots = s
  }

  getSpot(){
    return this.device.spots
  }

  async createDevice() {
    console.log("creazione device");
    this.pocketBase.createDevice(this.device);
    console.log("prendi device");

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
