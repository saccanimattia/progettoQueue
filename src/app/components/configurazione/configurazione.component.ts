import { Component } from '@angular/core';

@Component({
  selector: 'app-configurazione',
  templateUrl: './configurazione.component.html',
  styleUrls: ['./configurazione.component.scss']
})
export class ConfigurazioneComponent {
  ipAddress: any;

  submitForm() {
    // Puoi gestire qui la logica per inviare l'indirizzo IP del server del database
    console.log('Indirizzo IP del server del database:', this.ipAddress);
  }
}
