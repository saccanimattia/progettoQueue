import { Component,Output,EventEmitter } from '@angular/core';
import { DatiDispositivoService } from 'src/app/services/dati-dispositivo.service';
import { PocketBaseService } from 'src/app/services/pocket-base.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  @Output() buttonClick = new EventEmitter<void>();
  selectedLayout: any[] = []
  l: any

  constructor(private pocketBase : PocketBaseService, private salvadati : DatiDispositivoService){

  }

  async ngOnInit(){
    this.selectedLayout= await this.pocketBase.prendiLayouts();
    this.openModal()
  }

  openModal() {
    const modal = document.querySelector('#LayoutModal');
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display: block');
  }

 closeModal() {
    const modal = document.querySelector('#LayoutModal');
    console.log("chiudi modal")
      modal?.classList.remove('show');
      this.buttonClick.emit();
  }

  async submitForm() {

    localStorage.setItem('device', this.l)
    console.log(this.l)
    this.closeModal()

  }

}
