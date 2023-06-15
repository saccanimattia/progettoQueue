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
    this.openModal()
  }

  openModal() {
    const modal = document.querySelector('#categorieModal');
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display: block');
    this.prendiCategorie()
  }

  async closeModal() {
    const modal = document.querySelector('#categorieModal');

      modal?.classList.remove('show');
      modal?.setAttribute('style', 'display: none');
      this.buttonClick.emit();

  }

  async prendiCategorie(): Promise<void> {
    let a:any = await this.pocketBase.prendiCategorie()
    this.items = a;
    console.log(this.items)
}


}
