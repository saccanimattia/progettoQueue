import { Component, EventEmitter, Output } from '@angular/core';
import { DatiDispositivoService } from 'src/app/services/dati-dispositivo.service';
import { PocketBaseService } from 'src/app/services/pocket-base.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent {
  @Output() buttonClick = new EventEmitter<void>();
  title: any;

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
    modal?.classList.remove('show');
    modal?.setAttribute('style', 'display: none');
    this.buttonClick.emit();

  }

  async submitForm() {
    this.salvadati.setTitle(this.title);
    this.closeModal()
  }
}
