
import { Component, ElementRef, ViewChild } from '@angular/core';
import { DatiDispositivoService } from 'src/app/services/dati-dispositivo.service';
import { PocketBaseService } from 'src/app/services/pocket-base.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent {
  id : any
  layout : any
  device : any
  pubblicitaCorrente : any
  risorse : any[] = []
  logo: any
  currentYear : number;
  @ViewChild('carousel', { static: true }) carousel!: NgbCarousel;
  @ViewChild('videoPlayer') videoElement!: ElementRef;

  constructor(private pocketBase : PocketBaseService,
    private router : Router)
    {
    this.currentYear = new Date().getFullYear();
  }

  async ngOnInit() : Promise<void>{

    this.pocketBase.setIp()

    this.risorse = await this.pocketBase.prendiRisorse();


    this.pocketBase.setIp()
    this.id = localStorage.getItem('device')
    console.log('device')
    console.log(this.device)
    this.device = await this.pocketBase.prendiDeviceId(this.id)
    console.log('device')
    console.log(this.device)
    localStorage.setItem('printer', this.device.printer)
    this.pocketBase.prendiLayoutId(this.device.layout).then((response) => {
      this.layout = response;
      this.prendiPubb();
    });
    console.log('layout')
    console.log(this.device)
    this.prendiLogo();
    console.log("problemi")
    console.log(this.device)
  }

  async prendiPubb(){
    let pubb : any[] = []
    let i = 0

    if(this.layout.spots.length > 0){
        for(let spot of this.layout.spots){
          pubb[i] = await this.pocketBase.prendiSpotDaId(spot)
        }
        this.layout.spots = pubb
        this.randomPubblicita()
    }

  }

  randomPubblicita(): void {
    const randomIndex = Math.floor(Math.random() * this.layout.spots.length);
    this.pubblicitaCorrente = this.layout.spots[randomIndex];
    this.convertiMedia().then(() => {
      setTimeout(() => {
        this.initVideo(this.pubblicitaCorrente.medias);
      }, 1)

    });
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
      this.video = this.pubblicitaCorrente.medias[0]
  }

  video : any
  prendiLogo(){
    this.logo = this.risorse.find((r:any) =>
          r.name === 'logo'
         );
    this.logo.file = localStorage.getItem('indirizzoIp') + "/api/files/" + this.logo.collectionId + '/' + this.logo.id + '/' + this.logo.file + '?thumb=100x100&token=';
  }



  public currentVideoIndex: number = 0;

  videos: string[] = [];
  current: number = 0;

  initVideo(data: string[]) {
    this.videos = data;

    const player = document.getElementById("videoPlayer");
    console.log("PLAYER: ", player);
    player?.addEventListener("ended", this.handleVideo, false);
    const video = this.videoElement.nativeElement;
    const container = video.parentElement;

    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    const videoRatio = video.videoWidth / video.videoHeight;
    const containerRatio = containerWidth / containerHeight;

   if (containerRatio > videoRatio) {
      video.style.width = '100%';
      video.style.height = 'auto';
    } else {
      video.style.width = 'auto';
      video.style.height = '100%';
    }
    this.handleVideo();
  }

  handleVideo = () => {
    if (this.current === this.videos.length) {
      this.current = 0;
    }

    const player = document.getElementById("videoPlayer") as HTMLVideoElement;
    player.setAttribute("src", this.videos[this.current]);
    player.load();
    player.play();

    this.current++;
  };


  clickCounter = 0
  config(){
    this.clickCounter++
    if(this.clickCounter === 10){
      localStorage.clear()
      window.location.reload()
    }
  }

















}
