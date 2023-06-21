
import { Component, ElementRef, ViewChild } from '@angular/core';
import { DatiDispositivoService } from 'src/app/services/dati-dispositivo.service';
import { PocketBaseService } from 'src/app/services/pocket-base.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent {
  currentIndex: number = 0;
  id : any

  device : any
  pubblicitaCorrente : any
  risorse : any[] = []
  @ViewChild('myCarousel') myCarousel!: ElementRef;
  constructor(private pocketBase : PocketBaseService, private salvaDati : DatiDispositivoService,private elementRef: ElementRef){}

  async ngOnInit() : Promise<void>{
    this.pocketBase.setIp()

    this.device = this.salvaDati.getDevice()
    this.risorse = await this.pocketBase.prendiRisorse();
    console.log("juiuuuuui")
    console.log(this.device.type)
    if(this.device.type == ''){
      console.log("diund")
      this.pocketBase.setIp()
      console.log("home component prendi device")
      this.id = localStorage.getItem('device')
      console.log(this.id)
      this.device = await this.pocketBase.prendiDeviceId(this.id)
      console.log(this.device)
      this.prendiPubb()
    }




  }

  async prendiPubb(){
    console.log("qweasdzxc")
    console.log(this.device)
    console.log("uuusu")
    let pubb : any[] = []
    let i = 0
    if(this.device.spots.length > 0){
        for(let spot of this.device.spots){
          pubb[i]=await this.pocketBase.prendiSpotDaId(spot)
        }
        console.log("uueueueueueueueueueueueeue")

        this.device.spots = pubb
        console.log(this.device.spots)
        this.randomPubblicita()
    }
  }

  randomPubblicita(): void {
    const randomIndex = Math.floor(Math.random() * this.device.spots.length);
    this.pubblicitaCorrente = this.device.spots[randomIndex];
    console.log("pubb correntr")
    console.log(this.pubblicitaCorrente)
    this.convertiMedia()
    console.log(this.pubblicitaCorrente)
    this.startCarousel()
  }

  async convertiMedia(){
    let newMedias = [];

      for (let j = 0; j < this.pubblicitaCorrente.medias.length; j++) {
        const m = this.pubblicitaCorrente.medias[j];

        console.log(this.pubblicitaCorrente.medias[j])
        const x = this.pocketBase.prendiRisorsaa(m, this.risorse);
        const id = m;
        const imageUrl = localStorage.getItem('indirizzoIp') + "/api/files/" + x.collectionId + '/' + x.id + '/' + x.file + '?thumb=100x100&token=';
        console.log("link immagine");
        console.log(imageUrl);
        newMedias.push(imageUrl);
      }
      console.log(newMedias)
      this.pubblicitaCorrente.medias = newMedias;
  }


  startCarousel() {
    setInterval(() => {
      const carousel: any = this.myCarousel.nativeElement;
      carousel.classList.add('slide');
      carousel.classList.add('carousel');
      carousel.classList.add('slide');
      carousel.classList.add('carousel');
      carousel.classList.add('slide');
      carousel.classList.add('carousel');

      this.currentIndex = (this.currentIndex + 1) % this.pubblicitaCorrente.medias.length;
    }, 5000);
  }








}
