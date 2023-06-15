import { Component,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent {
  @Output() buttonClick = new EventEmitter<void>();
  selectedInputType: string = '';


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
    this.closeModal()

  }

}
