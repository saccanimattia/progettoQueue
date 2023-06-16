import { Component, Input } from '@angular/core';
import { PocketBaseService } from 'src/app/services/pocket-base.service';


@Component({
  selector: 'app-pulsante',
  templateUrl: './pulsante.component.html',
  styleUrls: ['./pulsante.component.scss']
})
export class PulsanteComponent {
  @Input() gruppo: any;
  group :  any = undefined
  x : any
  img : any


  constructor(private pocketBase : PocketBaseService){
  }


  async ngOnInit(): Promise<void> {
    console.log(this.gruppo);
    console.log("i35tr");
    this.group = await this.pocketBase.prendiCategoriaId(this.gruppo);;
    console.log("ir")
    console.log(this.group.image);
    this.x = await this.pocketBase.prendiRisorsa(this.group.image)
    console.log(this.x)
    this.img = localStorage.getItem('indirizzoIp') + "/api/files/" + this.x.collectionId + '/' + this.x.id + '/' + this.x.file + '?thumb=100x100&token=';
  }




  add(){
    this.group.number = this.group.number + 1
    this.group.queued = this.group.queued + 1
    this.pocketBase.updateGroup(this.group.id, this.group)
  }
}
