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

  async dev(){
    let d = {
      printer : localStorage.getItem('printer'),
      layout : localStorage.getItem('device')
    }
    this.pocketBase.device(d)
  }

}
