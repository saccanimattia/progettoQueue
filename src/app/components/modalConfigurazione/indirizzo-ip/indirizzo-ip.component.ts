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
    if(this.isCorretto){
      modal?.classList.remove('show');
      modal?.setAttribute('style', 'display: none');
      this.buttonClick.emit();
    }
    else{
      modal?.classList.add('err');
    }
  }

  async submitForm() {
    localStorage.setItem('indirizzoIp', this.ipAddress)
    this.pocketBase.setIp()
    this.isCorretto = await this.pocketBase.checkIp()
   this.closeModal()
  }
}
