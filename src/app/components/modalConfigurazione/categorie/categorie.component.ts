import { Component, EventEmitter, Output } from '@angular/core';
import { DatiDispositivoService } from 'src/app/services/dati-dispositivo.service';
import { PocketBaseService } from 'src/app/services/pocket-base.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent {
  @Output() buttonClick = new EventEmitter<void>();
  disabilitato = true


  selectedCategories : any[] = []
  items : any[] = []
  constructor(private pocketBase : PocketBaseService, private salvadati : DatiDispositivoService){

  }

  ngOnInit(){
    this.prendiCategorie()
  }

  openModal() {
    const modal = document.querySelector('#categorieModal');
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display: block');
  }

  async closeModal() {
    const modal = document.querySelector('#categorieModal');

      modal?.classList.remove('show');
      modal?.setAttribute('style', 'display: none');
      this.buttonClick.emit();

  }

  async prendiCategorie(): Promise<void> {
    this.pocketBase.setIp()
    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => reject('Tempo limite superato'), 5000);
    });

    Promise.race([this.pocketBase.prendiCategorie(), timeoutPromise])
      .then((immm: any) => {
        this.items = immm;
        this.scaricaImmagini()
      })
      .catch((error) => {
        console.error('Errore durante il recupero delle informazioni:', error);
        // Esegui le azioni di gestione dell'errore qui, ad esempio mostrare un messaggio all'utente
      });


}
  async scaricaImmagini(){

    for(let item of this.items){
      let x = await this.pocketBase.prendiRisorsa(item.image)
      item.image = localStorage.getItem('indirizzoIp') + "/api/files/" + x.collectionId + '/' + x.id + '/' + x.file + '?thumb=100x100&token='
    }
    this.openModal()
  }

  modificaStato(item : any, i : number){
    const elem = document.querySelector('#elem' + i);
    if(this.selectedCategories.length == 0 ){
      this.selectedCategories.push(item)
      elem?.classList.add('sel');
    }
    else if(this.isPresente(item)){
      const index = this.selectedCategories.indexOf(item);
      if (index !== -1) {
        this.selectedCategories.splice(index, 1);
      }
      elem?.classList.remove('sel');
    }
    else{
      this.selectedCategories.push(item)
      elem?.classList.add('sel');
    }
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
    let a  =[]
    for(let e of this.selectedCategories){
      e = e.id
      a.push(e)
    }
    this.selectedCategories = a
    this.salvadati.setCategories(this.selectedCategories);
    this.closeModal()
  }




}
