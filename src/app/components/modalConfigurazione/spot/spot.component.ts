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
  @Output() buttonClick = new EventEmitter<void>();
  disabilitato = true;
  @ViewChildren('videoPlayer') videoPlayers!: QueryList<ElementRef>;



  selectedSpot: any[] = [];
  items: any[] = [];

  constructor(private pocketBase: PocketBaseService, private salvadati: DatiDispositivoService) {}



  ngOnInit() {
    this.prendiSpot();
  }

  ngAfterViewInit() {
    this.videoPlayers.forEach((video: ElementRef) => {
      video.nativeElement.loop = true;
      video.nativeElement.play();
    });
  }


  async openModal() {
    console.log("apri modsl")
    const modal = document.querySelector('#categorieModal');
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display: block');
    console.log(this.items);
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
    console.log(this.items);
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
        console.log("link immagine");
        console.log(imageUrl);
        newMedias.push(imageUrl);
      }
      item.medias = newMedias;
    }
    console.log("junfditr53ugbu5iy");
    console.log(this.items);
    this.openModal();
  }

  modificaStato(item: any, i: number) {
    console.log(item);
    console.log(i);
    const elem = document.querySelector('#elem' + i);
    if (this.selectedSpot.length == 0) {
      console.log("0 elem");
      this.selectedSpot.push(item);
      elem?.classList.add('sel');
    } else if (this.isPresente(item)) {
      console.log("elem presente");
      const index = this.selectedSpot.indexOf(item);
      if (index !== -1) {
        this.selectedSpot.splice(index, 1);
      }
      elem?.classList.remove('sel');
    } else {
      console.log("elem non presente");
      this.selectedSpot.push(item);
      elem?.classList.add('sel');
    }
    console.log(this.selectedSpot);
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
    this.salvadati.setCategories(this.selectedSpot);
  }

  isImage(media: string): boolean {
    // Ottieni l'estensione del file
    let extension = media.substring(media.length-24, media.length-21).toLowerCase();
    console.log(extension);

    // Array di estensioni di file immagine supportate
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];

    // Verifica se l'estensione del file corrisponde a un'immagine supportata
    return imageExtensions.includes(extension);
  }

  isVideo(media: string): boolean {
    // Ottieni l'estensione del file
    const extension = media.substring(media.length-24, media.length-21).toLowerCase();

    // Array di estensioni di file video supportate
    const videoExtensions = ['mp4', 'avi', 'mov', 'mkv'];

    // Verifica se l'estensione del file corrisponde a un video supportato
    return videoExtensions.includes(extension);
  }
}
