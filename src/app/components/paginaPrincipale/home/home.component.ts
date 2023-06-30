
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
  @ViewChild('carousel', { static: true }) carousel!: NgbCarousel;
  @ViewChild('videoPlayer') e!: ElementRef;
  @ViewChild('pl',{ static: false })  ee!: ElementRef;
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
      this.spotIndex = 0

    this.pubblicitaCorrente = this.layout.spots[this.spotIndex];


    if(this.isMisto ==false){
      this.convertiMedia().then(() => {
        setTimeout(() => {

          this.initVideo(this.pubblicitaCorrente.medias)

        }, 1)
    });}
    else if(this.isPlayer){
      console.log(this.pubblicitaCorrente)
      this.spotIndex ++;
      this.current = 0
      this.initVideo(this.pubblicitaCorrente)
      console.log("this.pubblicitaCorrente")

    }
    else if(!this.isPlayer){
      console.log("ciao")
      console.log(this.pubblicitaCorrente)
      this.spotIndex ++;
      this.current = 0
      this.videos  = this.pubblicitaCorrente.medias
      console.log(this.player)
      this.renderer.setStyle(this.player, 'display', 'block');
      this.handleVideo()
      console.log("this.pubblicitaCorrente")

    }
    if(this.pubblicitaCorrente.type == 'misto'){
        console.log(this.pubblicitaCorrente.type)
        this.isMisto = true
        this.spotIndex ++;
        this.gestisciSpot()
        this.randomPubblicita()
      }
  }
  aaaa : any

  indiceCorrente = 0
  gestisciSpot() {
    const vettore = [];
    let  medias = [];
    let  setinterval = [];
    let  volume = [];
    let imm = true
    let vid = true

    for (let i = 0; i < this.pubblicitaCorrente.medias.length; i++) {
      let file : string = this.pubblicitaCorrente.medias.file[i];
      const estensione = file.substring(file.length-24, file.length-21);


      if ((estensione === 'jpg' || estensione === 'png' || estensione === 'vif') && imm === false)  {

        this.creaSpotVideo(medias, setinterval, volume)
        medias = []
        setinterval = []
        volume = []
      } else if ((estensione === 'mp4' || estensione === 'avi' || estensione === 'mov') && vid === false) {

        this.creaSpotImmagini(medias, setinterval, volume)
        medias = []
        setinterval = []
        volume = []
      }

      if (estensione === 'jpg' || estensione === 'png' || estensione === 'vif') {

        medias.push(this.pubblicitaCorrente.medias.file[i]);
        setinterval.push(this.pubblicitaCorrente.medias.durata[i]);
        volume.push(this.pubblicitaCorrente.medias.volume[i]);
        imm = true
        vid = false

      } else if (estensione === 'mp4' || estensione === 'avi' || estensione === 'mov') {

        medias.push(this.pubblicitaCorrente.medias.file[i]);
        setinterval.push(this.pubblicitaCorrente.medias.durata[i]);
        volume.push(this.pubblicitaCorrente.medias.volume[i]);
        imm = false
        vid = true

      }

      vettore.push(this.pubblicitaCorrente.medias.file[i])

    }

    if (medias.length > 0) {
      if (!imm) {
        this.creaSpotVideo(medias, setinterval, volume);
      } else if (!vid) {
        this.creaSpotImmagini(medias, setinterval, volume);
      }
    }
    medias = []
    setinterval = []
    volume = []

  }


  creaSpotVideo(file:any, durata : any, volume : any){
     let spotVideo : any = {
      type: "player",
      medias : {
        file: file,
        durata: durata,
        volume: volume
      }
    };

    console.log(this.layout.spots)
    this.layout.spots.push(spotVideo)

  }

  creaSpotImmagini(file:any, durata : any, volume : any){
    let spotImmagini : any = {
      type: "carousel",
      medias : {
        file: file,
        durata: durata,
        volume: volume
      }
    };

    console.log(this.layout.spots)
    this.layout.spots.push(spotImmagini)
  }


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
      setTimeout(() => {
        this.handleVideo();
      }, 1000);
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
    this.player.setAttribute("src", this.videos.file[this.current]);
    this.player.volume =  this.videos.volume[this.current];

    this.player.load();
    this.aaaa = this.player.play();
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
}
