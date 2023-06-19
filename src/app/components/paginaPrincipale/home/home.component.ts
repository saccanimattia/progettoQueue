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

  constructor(private pocketBase : PocketBaseService){}

  async ngOnInit() : Promise<void>{
    this.pocketBase.setIp()
    console.log("home component prendi device")
    this.id = localStorage.getItem('device')
    console.log(this.id)
    this.device = await this.pocketBase.prendiDeviceId(this.id)
  }
}
