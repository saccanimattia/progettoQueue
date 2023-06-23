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
  selectedDevices: any[] = []
  deviuce: any
  layouts : any

  constructor(private pocketBase : PocketBaseService, private salvadati : DatiDispositivoService){

  }

  async ngOnInit(){
    this.selectedDevices= await this.pocketBase.prendiDevices().then(
      this.deviuce = this.selectedDevices[0]
    )
    this.layouts= await this.pocketBase.prendiLayouts();
    this.filtraDevice()
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
    console.log(this.selectedDevices[0].id)
    if(this.deviuce == undefined)
    localStorage.setItem('device', this.selectedDevices[0].id)
    else
    localStorage.setItem('device', this.deviuce)
    console.log(this.deviuce)
    this.closeModal()

  }

  filtraDevice(){
    let i  = 0;
    console.log(this.selectedDevices)
    for(let d of this.selectedDevices){
      d.layout = this.trovaLayout(d.layout)

      if(d.layout.type != 'queue')
        this.selectedDevices.splice(i, 1)
      i++
    }
    console.log(this.selectedDevices)
  }


  trovaLayout(id : any){
    console.log("isiisisis")
    console.log(id)
    const ll = this.layouts.find((r:any) =>
        r.id === id
       );
    return ll
  }

}
