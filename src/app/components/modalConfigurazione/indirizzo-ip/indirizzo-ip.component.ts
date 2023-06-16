import { Component, EventEmitter, Output } from '@angular/core';
import { DatiDispositivoService } from 'src/app/services/dati-dispositivo.service';
import { PocketBaseService } from 'src/app/services/pocket-base.service';

@Component({
  selector: 'app-indirizzo-ip',
  templateUrl: './indirizzo-ip.component.html',
  styleUrls: ['./indirizzo-ip.component.scss']
})
export class IndirizzoIpComponent {
  @Output() buttonClick = new EventEmitter<void>();
  ipAddress: any;
  isCorretto = true;

  constructor(private pocketBase : PocketBaseService, private salvadati : DatiDispositivoService){

  }

  ngOnInit(){
    this.openModal()
  }

  openModal() {
    const modal = document.querySelector('#ipModal');
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display: block');
  }

  async closeModal() {
    const modal = document.querySelector('#ipModal');
    console.log("chiudi modal")
    console.log(this.isCorretto)
    if(this.isCorretto){
      console.log("indirizzoGiusto")
      modal?.classList.remove('show');
      modal?.setAttribute('style', 'display: none');
      this.buttonClick.emit();
    }
    else{
      console.log("indirizzoSbagliato")
      modal?.classList.add('err');
    }
  }

  async submitForm() {
    // Puoi gestire qui la logica per inviare l'indirizzo IP del server del database
    localStorage.setItem('indirizzoIp', this.ipAddress)
    this.pocketBase.setIp()
    this.isCorretto = await this.pocketBase.checkIp()
    console.log(this.isCorretto)
    this.salvadati.setIp();
    this.closeModal()
    console.log(this.ipAddress)
  }
}
