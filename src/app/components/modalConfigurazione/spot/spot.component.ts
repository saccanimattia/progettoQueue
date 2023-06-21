import { Component, ElementRef, EventEmitter, Output, QueryList, ViewChildren } from '@angular/core';

import { async } from 'rxjs';

import { DatiDispositivoService } from 'src/app/services/dati-dispositivo.service';
import { PocketBaseService } from 'src/app/services/pocket-base.service';

@Component({
  selector: 'app-spot',
  templateUrl: './spot.component.html',
  styleUrls: ['./spot.component.scss']
})
export class SpotComponent {
  @ViewChildren('videoPlayer') videoPlayers!: QueryList<ElementRef<HTMLVideoElement>>;
  @Output() buttonClick = new EventEmitter<void>();

  disabilitato = true;
  selectedSpot: any[] = [];
  items: any[] = [];

  constructor(private pocketBase: PocketBaseService, private salvadati: DatiDispositivoService) {}

  ngOnInit() {
    this.prendiSpot();
  }
  ngAfterViewInit(): void {
    this.videoPlayers.forEach((video: ElementRef) => {
      video.nativeElement.loop = true;
      video.nativeElement.play();
    });
  }

  async openModal() {
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

  async prendiSpot(): Promise<void> {
    await this.pocketBase.setIp();
    let a: any = await this.pocketBase.prendiSpot();
    this.items = a;
    this.scaricaImmagini();
  }

  async scaricaImmagini() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      let newMedias = [];
      for (let j = 0; j < item.medias.length; j++) {
        const m = item.medias[j];
        const x = await this.pocketBase.prendiRisorsa(m);
        const id = m;
        const imageUrl = localStorage.getItem('indirizzoIp') + "/api/files/" + x.collectionId + '/' + x.id + '/' + x.file + '?thumb=100x100&token=';
        newMedias.push(imageUrl);
      }
      item.medias = newMedias;
    }
    this.openModal();
  }

  modificaStato(item: any, i: number) {
    const elem = document.querySelector('#elem' + i);
    if (this.selectedSpot.length == 0) {
      this.selectedSpot.push(item);
      elem?.classList.add('sel');
    } else if (this.isPresente(item)) {
      const index = this.selectedSpot.indexOf(item);
      if (index !== -1) {
        this.selectedSpot.splice(index, 1);
      }
      elem?.classList.remove('sel');
    } else {
      this.selectedSpot.push(item);
      elem?.classList.add('sel');
    }
    if (this.selectedSpot.length == 0) {
      this.disabilitato = true;
    }
    if (this.selectedSpot.length > 0) {
      this.disabilitato = false;
    }
  }

  isPresente(item: any) {
    for (let i of this.selectedSpot) {
      if (i === item)
        return true;
    }
    return false;
  }

  save() {
    let a  =[]
    for(let e of this.selectedSpot){
      e = e.id
      a.push(e)
    }
    this.salvadati.setSpot(a);
    this.closeModal()
  }

  isImage(media: string): boolean {
    let extension = media.substring(media.length-24, media.length-21).toLowerCase();
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    return imageExtensions.includes(extension);
  }

  isVideo(media: string): boolean {
    const extension = media.substring(media.length-24, media.length-21).toLowerCase();
    const videoExtensions = ['mp4', 'avi', 'mov', 'mkv'];
    return videoExtensions.includes(extension);
  }
}

