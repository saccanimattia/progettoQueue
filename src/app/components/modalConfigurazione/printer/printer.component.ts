import { Component, EventEmitter, Output } from '@angular/core';
import { DatiDispositivoService } from 'src/app/services/dati-dispositivo.service';
import { PocketBaseService } from 'src/app/services/pocket-base.service';

@Component({
  selector: 'app-printer',
  templateUrl: './printer.component.html',
  styleUrls: ['./printer.component.scss']
})
export class PrinterComponent {
  @Output() buttonClick = new EventEmitter<void>();
  ipAddress: any;

  constructor(private pocketBase : PocketBaseService, private salvadati : DatiDispositivoService){

  }

  ngOnInit(){
    this.openModal()
  }

  openModal() {
    const modal = document.querySelector('#print');
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display: block');
  }

  async closeModal() {
    const modal = document.querySelector('#print');
    console.log("chiudi modal")
    console.log("indirizzoGiusto")
    modal?.classList.remove('show');
    modal?.setAttribute('style', 'display: none');
    this.buttonClick.emit();

  }

  async submitForm() {
    localStorage.setItem('printer', this.ipAddress)
    this.salvadati.setPrinter();
    this.closeModal()

  }
}
