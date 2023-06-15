import { Component, EventEmitter, Output } from '@angular/core';
import { PocketBaseService } from 'src/app/services/pocket-base.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent {
  @Output() buttonClick = new EventEmitter<void>();



  selectedCategories : any[] = []
  items : any[] = []
  constructor(private pocketBase : PocketBaseService){

  }

  ngOnInit(){
    this.prendiCategorie()
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

  async prendiCategorie(): Promise<void> {
    this.pocketBase.setIp()
    let a:any = await this.pocketBase.prendiCategorie()
    this.items = a;
    console.log(this.items)
    this.scaricaImmagini()
}

  scaricaImmagini(){
    for(let item of this.items){
      console.log(item.immagine)
      item.immagine = localStorage.getItem('indirizzoIp') + "/api/files/" + item.collectionId + '/' + item.id + '/' + item.immagine + '?thumb=100x100&token='
      console.log(item.immagine)
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
      this.selectedCategories.splice(item, 1)
      elem?.classList.remove('sel');
    }
    else{
      console.log("elem non presente")
      this.selectedCategories.push(item)
      elem?.classList.add('sel');
    }
    console.log(this.selectedCategories)
  }

  isPresente(item : any){
    for(let i of this.selectedCategories){
      if(i === item)
        return true
    }
    return false
  }




}
