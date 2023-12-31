import { Component, Input, OnInit, } from '@angular/core';
import { DatiDispositivoService } from 'src/app/services/dati-dispositivo.service';
import { PocketBaseService } from 'src/app/services/pocket-base.service';
import PocketBase from 'pocketbase';
import { SoundService } from 'src/app/services/sound-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pulsante',
  templateUrl: './pulsante.component.html',
  styleUrls: ['./pulsante.component.scss']
})
export class PulsanteComponent implements OnInit {
  @Input() gruppo: any;
  @Input() risorsee: any[] = [];
  group: any = undefined;
  x: any;
  img: any;
  timeoutLimit = 5000;
  max : any
  pb : any
  coda = 0
  nz = ""


  constructor(private pocketBase: PocketBaseService, private dati : DatiDispositivoService, private soundService: SoundService) {}

  ngOnInit(): void {
    this.group = this.gruppo;

    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => reject('Tempo limite superato'), this.timeoutLimit);
    });
    Promise.race([this.pocketBase.prendiCategoriaId(this.gruppo), timeoutPromise])
      .then(async (groupData: any) => {
        this.group = groupData;
        this.max = this.group.max_number
        this.xx = await this.pocketBase.contaCoda(this.group.id)
        this.coda = this.xx.length
        this.trovaNz()
        return this.pocketBase.prendiRisorsaa(this.group.image, this.risorsee);

      })
      .then((xData: any) => {
        this.x = xData;
        this.img = localStorage.getItem('indirizzoIp') + "/api/files/" + this.x.collectionId + '/' + this.x.id + '/' + this.x.file + '?thumb=100x100&token=';

        const ipAddress = localStorage.getItem('indirizzoIp')!;
      this.pb = new PocketBase(ipAddress);



      this.pb.collection('groups').subscribe(this.group.id, (e:any) => {
        this.group.number = e.record.number;
        this.group.queued = e.record.queued;
        this.trovaNz()
    });

    this.pb.collection('queue').subscribe('*' , async (e:any) => {
     this.xx = await this.pocketBase.contaCoda(this.group.id)
    this.coda = this.xx.length
  });

      })
      .catch((error) => {
        console.error('Errore durante il recupero delle informazioni:', error);
      });
  }

  xx : any
  isClickable = true;

  async add(): Promise<void> {
    let timerInterval: any;


    if (!this.isClickable) {
      return;
    }

    this.isClickable = false;

    let print = localStorage.getItem('printer');
    let _body =  JSON.stringify({
      groupId: this.group.id,
      printerId: print
    });

    try {
      this.soundService.playSound();
      Swal.fire({
        title: 'Stampa in corso...',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const b: any = Swal.getHtmlContainer()!.querySelector('b');
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft();
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
        allowOutsideClick: false,
        customClass: {
          title: 'aaaaa', // Assegna la classe CSS personalizzata

        }
      }).then((result: any) => {

        if (result.dismiss === Swal.DismissReason.timer) {
          console.log('È stato chiuso dal timer');
        }
      });

      await fetch(localStorage.getItem('server') + ":3000/print", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: _body
      })


      this.pocketBase.creaQueue(this.group);


    this.group.queued = this.group.queued + 1;
      this.trovaNz();
    this.pocketBase.updateGroup(this.group.id, this.group);


    } catch (error) {
      console.error('Errore durante l\'aggiunta:', error);
      Swal.fire({
        icon: 'error',
        title: 'Errore',
        text: 'Stampante non collegata',
        customClass: {
          title: 'aaaaa', // Assegna la classe CSS personalizzata

        }
      });
    } finally {
      this.isClickable = true;
    }

  }



  trovaNz(){
    this.nz = ""
    for (let i = 0; i < this.group.max_number.toString().length-this.group.number.toString().length; i++) {

      this.nz = this.nz.concat('0');
    }
  }


}
