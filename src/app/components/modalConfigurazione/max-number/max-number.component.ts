import { Component, EventEmitter, Output } from '@angular/core';
import { DatiDispositivoService } from 'src/app/services/dati-dispositivo.service';
import { PocketBaseService } from 'src/app/services/pocket-base.service';

@Component({
  selector: 'app-max-number',
  templateUrl: './max-number.component.html',
  styleUrls: ['./max-number.component.scss']
})
export class MaxNumberComponent {
  @Output() buttonClick = new EventEmitter<void>();
  maxNumber: any;

  constructor(private pocketBase : PocketBaseService, private salvadati : DatiDispositivoService){

  }

  ngOnInit(){
    this.openModal()
  }

  openModal() {
    console.log("aapri il modal")
    const modal = document.querySelector('#ll');
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display: block');
  }

  async closeModal() {
    const modal = document.querySelector('#ll');
    console.log("chiudi modal")
    console.log("indirizzoGiusto")
    modal?.classList.remove('show');
    modal?.setAttribute('style', 'display: none');
    this.buttonClick.emit();

  }

  async submitForm() {
    // Puoi gestire qui la logica per inviare l'indirizzo IP del server del database
    this.salvadati.setMaxNumber(this.maxNumber);
    this.closeModal()

  }
}
