import { Component, EventEmitter, Output } from '@angular/core';
import { DatiDispositivoService } from 'src/app/services/dati-dispositivo.service';
import { PocketBaseService } from 'src/app/services/pocket-base.service';

@Component({
  selector: 'app-spot',
  templateUrl: './spot.component.html',
  styleUrls: ['./spot.component.scss']
})
export class SpotComponent {
  @Output() buttonClick = new EventEmitter<void>();
  disabilitato = true


  selectedCategories : any[] = []
  items : any[] = []
  constructor(private pocketBase : PocketBaseService, private salvadati : DatiDispositivoService){

  }

  ngOnInit(){
    this.prendiSpot()
  }

  openModal() {
    const modal = document.querySelector('#categorieModal');
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display: block');
    console.log(this.items)
  }

  async closeModal() {
    const modal = document.querySelector('#categorieModal');

      modal?.classList.remove('show');
      modal?.setAttribute('style', 'display: none');
      this.buttonClick.emit();

  }

  async prendiSpot(): Promise<void> {
    this.pocketBase.setIp()
    let a:any = await this.pocketBase.prendiSpot()
    this.items = a;
    console.log(this.items)
    this.scaricaImmagini()
}

  async scaricaImmagini(){

    for(let item of this.items){
     for(let m of item.risorse){
      let x = await this.pocketBase.prendiRisorsa(m)

      m = localStorage.getItem('indirizzoIp') + "/api/files/" + x.collectionId + '/' + x.id + '/' + x.file + '?thumb=100x100&token='
      console.log(item.immagine)
     }
    }
    this.openModal()
  }

  modificaStato(item : any, i : number){
    console.log(item)
    console.log(i)
    const elem = document.querySelector('#elem' + i);
    if(this.selectedCategories.length == 0 ){
      console.log("0 elem")
      this.selectedCategories.push(item)
      elem?.classList.add('sel');
    }
    else if(this.isPresente(item)){
      console.log("elem presente")
      const index = this.selectedCategories.indexOf(item);
      if (index !== -1) {
        this.selectedCategories.splice(index, 1);
      }
      elem?.classList.remove('sel');
    }
    else{
      console.log("elem non presente")
      this.selectedCategories.push(item)
      elem?.classList.add('sel');
    }
    console.log(this.selectedCategories)
    if(this.selectedCategories.length == 0){
      this.disabilitato = true;
    }
    if(this.selectedCategories.length > 0){
      this.disabilitato = false;
    }
  }

  isPresente(item : any){
    for(let i of this.selectedCategories){
      if(i === item)
        return true
    }
    return false
  }

  save(){
    this.salvadati.setCategories(this.selectedCategories);
  }
}
