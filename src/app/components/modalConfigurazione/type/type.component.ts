

import { Component,Output,EventEmitter } from '@angular/core';
import { DatiDispositivoService } from 'src/app/services/dati-dispositivo.service';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent {
  @Output() buttonClick = new EventEmitter<void>();
  selectedInputType: string = '';
  isInputTypeSelected: boolean = false;
  constructor(private salvadati: DatiDispositivoService){}

  openModal() {
    const modal = document.querySelector('.modal');
    if (modal instanceof HTMLElement) {
      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
      modal.style.display = 'block';
    }
  }

  closeModal() {
    const modal = document.querySelector('.modal');
    if (modal instanceof HTMLElement) {
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
      modal.style.display = 'none';
    }
    this.buttonClick.emit();
  }

  saveModalChanges() {
    // Implement the logic to save modal changes
    console.log('Input Type:', this.selectedInputType);
    this.salvadati.setType(this.selectedInputType);
    this.closeModal()

  }
  selectInputType(inputType: string) {
    this.selectedInputType = inputType;
    this.isInputTypeSelected = true;
}

  // Nel tuo componente


checkInputTypeSelection() {
  this.isInputTypeSelected = this.selectedInputType === 'QUEUE' || this.selectedInputType === 'SIGNAGE';}
}



