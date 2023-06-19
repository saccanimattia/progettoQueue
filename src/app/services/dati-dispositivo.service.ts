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

  getDevice(){
    return this.device;
  }

  async createDevice() {
    console.log("creazione device");
    this.pocketBase.createDevice(this.device);
    console.log("prendi device");


  }






}
