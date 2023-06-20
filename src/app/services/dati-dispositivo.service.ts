import { Injectable } from '@angular/core';
import { PocketBaseService } from './pocket-base.service';

@Injectable({
  providedIn: 'root'
})
export class DatiDispositivoService {

  ip : any
  printer : any
  device = {
    name : '',
    groups : [],
    type : '',
    title: '',
    spots : [],
    maxNumber : 0
  }
  constructor(private pocketBase : PocketBaseService) { }

  setIp(){
    this.ip = localStorage.getItem('indirizzoIp')!
  }

  getIp(){
    return this.ip
  }

  setPrinter(){
    this.printer = localStorage.getItem('printer')!
  }

  getPrinter(){
    return this.printer
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

  setTitle(s : any){
    this.device.title = s
  }

  getTitle(){
    return this.device.title
  }

  setMaxNumber(s : any){
    this.device.maxNumber = s
  }

  getMaxNumber(){
    return this.device.maxNumber
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
    this.pocketBase.createDevice(this.device);
  }


  async dev(){
    let d = {
      printer : localStorage.getItem('printer'),
      layout : localStorage.getItem('device')
    }
    this.pocketBase.device(d)
  }






}
