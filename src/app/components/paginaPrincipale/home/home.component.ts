
import { Component, ElementRef, ViewChild } from '@angular/core';
import { DatiDispositivoService } from 'src/app/services/dati-dispositivo.service';
import { PocketBaseService } from 'src/app/services/pocket-base.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent {
  id : any

  device : any
  pubblicitaCorrente : any
  risorse : any[] = []
  logo: any
  @ViewChild('carousel', { static: true }) carousel!: NgbCarousel;

  constructor(private pocketBase : PocketBaseService){}

  async ngOnInit() : Promise<void>{
    this.pocketBase.setIp()

    this.risorse= await this.pocketBase.prendiRisorse();


    this.pocketBase.setIp()
    this.id = localStorage.getItem('device')
    this.device = await this.pocketBase.prendiDeviceId(this.id)
    this.prendiPubb()
    this.prendiLogo()
  }

  async prendiPubb(){
    let pubb : any[] = []
    let i = 0
    if(this.device.spots.length > 0){
        for(let spot of this.device.spots){
          pubb[i]=await this.pocketBase.prendiSpotDaId(spot)
        }
        this.device.spots = pubb
        this.randomPubblicita()
    }
  }

  randomPubblicita(): void {
    const randomIndex = Math.floor(Math.random() * this.device.spots.length);
    this.pubblicitaCorrente = this.device.spots[randomIndex];
    this.convertiMedia()
  }

  async convertiMedia(){
    let newMedias = [];
      for (let j = 0; j < this.pubblicitaCorrente.medias.length; j++) {
        const m = this.pubblicitaCorrente.medias[j];
        const x = this.pocketBase.prendiRisorsaa(m, this.risorse);
        const id = m;
        const imageUrl = localStorage.getItem('indirizzoIp') + "/api/files/" + x.collectionId + '/' + x.id + '/' + x.file + '?thumb=100x100&token=';
        newMedias.push(imageUrl);
      }
      this.pubblicitaCorrente.medias = newMedias;
  }

  prendiLogo(){
    this.logo = this.risorse.find((r:any) =>
          r.name === 'logo'
         );
    this.logo.file = localStorage.getItem('indirizzoIp') + "/api/files/" + this.logo.collectionId + '/' + this.logo.id + '/' + this.logo.file + '?thumb=100x100&token=';
  }


















}
