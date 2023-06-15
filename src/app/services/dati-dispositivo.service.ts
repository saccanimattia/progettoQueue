import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatiDispositivoService {

  ip : any
  categorie : any[] = []
  type : any
  spot : any[] = []
  constructor() { }

  setIp(){
    this.ip = localStorage.getItem('indirizzoIp')
  }

  getIp(){
    return this.ip
  }

  setType(tipo : any){
    this.type = tipo
  }

  getType(){
    return this.type
  }

  setCategories(c : any){
    this.categorie = c
  }

  getCategories(){
    return this.categorie
  }

  setSpot(s : any){
    this.spot = s
  }

  ggetSpot(){
    return this.spot
  }
}
