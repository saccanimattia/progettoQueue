
import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { DatiDispositivoService } from 'src/app/services/dati-dispositivo.service';
import { PocketBaseService } from 'src/app/services/pocket-base.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { SoundService } from 'src/app/services/sound-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent {
  id : any
  layout : any
  device : any
  volume : any
  pubblicitaCorrente : any
  risorse : any[] = []
  logo: any
  durataIntervallo = 3000
  currentYear : number;
  img_path : any
  isImage  = false
  isPlayer = false
  currentMedia : any
  currentVolume : any
  currentDuration : any
  currentIndex: number = 0;
  timeoutId: any;
  @ViewChild('videoPlayerr') videoPlayer!: ElementRef;
  @ViewChild('carousel', { static: true }) carousel!: NgbCarousel;
  @ViewChild('videoPlayer') e!: ElementRef;

  isMisto = false

  constructor(private pocketBase : PocketBaseService, private s : SoundService,
    private router : Router , private renderer: Renderer2)
    {
    this.currentYear = new Date().getFullYear();
  }

  async ngOnInit() : Promise<void>{

    this.pocketBase.setIp()


    this.pocketBase.prendiRisorse().then((response) => {
      this.risorse = response;
      let e = this.pocketBase.prendiRisorsaaName('suono', this.risorse)

      e = localStorage.getItem('indirizzoIp') + "/api/files/" + e.collectionId + '/' + e.id + '/' + e.file + '?thumb=100x100&token=';
      this.s.setPath(e)
    });

    this.pocketBase.setIp()
    this.id = localStorage.getItem('device')
    this.device = await this.pocketBase.prendiDeviceId(this.id)
    localStorage.setItem('printer', this.device.printer)

    this.pocketBase.serverToId()

    this.pocketBase.prendiLayoutId(this.device.layout).then((response) => {
      this.layout = response;
      this.prendiPubb();
    });
    this.prendiLogo();
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

  spotIndex = 0
  randomPubblicita(): void {
    this.counter = 0
    this.current = 0


    if(this.spotIndex == this.layout.spots.length)

      this.spotIndex = 0;

    this.pubblicitaCorrente = this.layout.spots[this.spotIndex];

    console.log("pubblicita corr")
    console.log(this.pubblicitaCorrente)



    if(this.pubblicitaCorrente.type == 'player'){
      this.convertiMedia().then(() => {
        setTimeout(() => {

          this.initVideo(this.pubblicitaCorrente.medias)

        }, 1)
        if(this.isPlayer){

          this.spotIndex ++;
          this.current = 0
          this.initVideo(this.pubblicitaCorrente)



        }
        else if(!this.isPlayer){
          console.log("ciao")
          console.log(this.pubblicitaCorrente)
          this.spotIndex ++;
          this.current = 0
          this.videos  = this.pubblicitaCorrente.medias
          this.player = document.getElementById("videoPlayer") as HTMLVideoElement;
          console.log(this.player)
          this.renderer.setStyle(this.player, 'display', 'block');
          this.handleVideo()
          console.log("this.pubblicitaCorrente")

        }
    })
  }

    if(this.pubblicitaCorrente.type == 'misto'){
      console.log("AAAAAAAAAAAAA")
        this.convertiMedia().then(() => {
          setTimeout(() => {


            console.log(this.pubblicitaCorrente)
          this.playMedia()

        }, 1)

      })
    }

  }

  p:any
  aaaa : any

  indiceCorrente = 0

  async convertiMedia(){
    let newMedias  = [];
    let volumi = []
    let durata = []
      for (let j = 0; j < this.pubblicitaCorrente.medias.length; j++) {
        const m = this.pubblicitaCorrente.medias[j];
        const x = this.pocketBase.prendiRisorsaa(m, this.risorse);
        const id = m;
        const imageUrl = localStorage.getItem('indirizzoIp') + "/api/files/" + x.collectionId + '/' + x.id + '/' + x.file + '?thumb=100x100&token=';
        newMedias.push(imageUrl);

        volumi.push(x.volume/100)
        durata.push(x.set_interval)

      }

      this.pubblicitaCorrente.medias.file = newMedias;
      this.pubblicitaCorrente.medias.volume = volumi;
      this.pubblicitaCorrente.medias.durata = durata;

      this.video = this.pubblicitaCorrente.medias.file[0]
      this.volume = this.pubblicitaCorrente.medias.volume[0]

  }

  video : any
  prendiLogo(){
    this.logo = this.risorse.find((r:any) =>
          r.name === 'logo'
         );
         console.log("ddddd2")
    this.logo.file = localStorage.getItem('indirizzoIp') + "/api/files/" + this.logo.collectionId + '/' + this.logo.id + '/' + this.logo.file + '?thumb=100x100&token=';
  }





  public currentVideoIndex: number = 0;

  videos: any;
  current: number = 0;

  initVideo(data: any) {

    console.log(data)
    this.videos = data;
    this.player = document.getElementById("videoPlayer");
    this.player?.addEventListener("ended", () => {

        this.handleVideo();

    }, false);
    const video = this.e.nativeElement;
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
    this.player = document.getElementById("videoPlayer") as HTMLVideoElement;
    this.handleVideo();
  }
  player : any

  handleVideo = () => {

    if (this.current >= this.videos.file.length) {
      this.player.setAttribute("src", null);
    this.randomPubblicita();
    return;
  }


    console.log("VIDEO")
    console.log(this.videos)

    this.player.setAttribute("src", this.videos.file[this.current]);
    this.player.volume =  this.videos.volume[this.current];

    this.player.load();


    if (this.player) {
      this.aaaa = this.player.play();
    }



  if (this.aaaa !== undefined) {
    this.aaaa.then((a : any) => {
      this.current++;
      return null
    })
  };
  }
  clickCounter = 0
  config(){
    this.clickCounter++
    if(this.clickCounter === 10){
      localStorage.clear()
      window.location.reload()
    }
  }
  counter = 0
  onCarouselSlide(event: NgbSlideEvent) {
    this.counter++
    if (this.counter === this.pubblicitaCorrente.medias.file.length) {
      this.randomPubblicita();
    }
  }





  playMedia() {
    this.currentMedia = this.pubblicitaCorrente.medias.file[this.currentIndex]
    this.currentDuration = this.pubblicitaCorrente.medias.durata[this.currentIndex]
    this.currentVolume = this.pubblicitaCorrente.medias.volume[this.currentIndex]
    console.log(this.currentMedia)
    this.isVideo(this.currentMedia)
    this.p = document.getElementById("videoPlayerr") as HTMLVideoElement;
    console.log(this.currentDuration)
    console.log(this.currentVolume)
    clearTimeout(this.timeoutId);
    console.log(this.p, this.currentMedia);
    if (this.isVideo(this.currentMedia) && this.p) {
      console.log("video")
      this.p?.addEventListener("ended", () => {

        this.nextMedia();

    }, false);
    } else {
      console.log("immagine")
      this.timeoutId = setTimeout(() => this.nextMedia(), this.currentDuration);
    }
  }

  nextMedia() {
    console.log("idejdijdijijdidjdijdij")
    this.currentIndex = (this.currentIndex + 1) % this.pubblicitaCorrente.medias.file.length;
    this.playMedia();
  }

  isVideo(src: string) {
    let file : string = src;
    const estensione = file.substring(file.length-24, file.length-21);
    console.log(estensione)
    if(estensione === 'mp4')
      return true;
    return false
  }
}






