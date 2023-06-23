import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PocketBaseService {
  private pb: PocketBase;
  r : any[] = []
  timeoutLimit = 1000;
  layouts : any[] = []


  constructor(private http: HttpClient) {
    this.pb = new PocketBase('');
  }

  setIp() {
    const ipAddress = localStorage.getItem('indirizzoIp')!;
    this.pb = new PocketBase(ipAddress);
  }

  async checkIp(): Promise<boolean> {
    try {
      const result = await this.pb.collection('layouts').getList(1, 50, { '$autoCancel': false });
      return true;
    } catch (err : any) {
      if (err.response.status === 404) {
        console.log(err.response.status)
        return false;

      } else {
        return false;

      }
    }
  }

  async prendiCategorie(): Promise<any[]> {
    try {

      const result = await this.pb.collection('groups').getList(1, 50, { '$autoCancel': false });
      let categorie = result.items;
      return categorie
    } catch (err) {
      console.log("Si è verificato un errore:", err);
    }
      return []
    }

    async prendiSpot(): Promise<any[]> {


        const result = await this.pb.collection('spots').getList(1, 50, { '$autoCancel': false });
        let spot = result.items;

        return spot
      }

    async prendiRisorse(): Promise<any[]> {
      try {

        const result = await this.pb.collection('medias').getList(1, 50, { '$autoCancel': false });
        let risorse = result.items;
        return risorse
      } catch (err) {
        console.log("Si è verificato un errore:", err);
      }
        return []
      }

      async prendiRisorsa(id : any): Promise<any> {
        let risorse = await this.prendiRisorse()
        const risorsa = risorse.find((r:any) =>
          r.id === id
         );
         return risorsa
      }

      prendiRisorsaa(id : any, risorse : any[]){

        const risorsa = risorse.find((r:any) =>
          r.id === id
         );
         return risorsa
      }

      async createDevice(device : any): Promise<any> {

        try {
          const record = await this.pb.collection('layouts').create(device);
        } catch (err) {
          console.log("Si è verificato un errore:", err);
          return []; // Restituisci un array vuoto in caso di errore
        }
      }

      async device(d : any): Promise<any> {

        try {
          const record = await this.pb.collection('devices').create(d);
        } catch (err) {
          console.log("Si è verificato un errore:", err);
          return []; // Restituisci un array vuoto in caso di errore
        }
      }

      async prendiLayouts(): Promise<any> {

        try {

          const result = await this.pb.collection('layouts').getList(1, 50, { '$autoCancel': false });
          let layouts = result.items;

        return layouts
        } catch (err) {
          console.log("Si è verificato un errore:", err);
          return []; // Restituisci un array vuoto in caso di errore
        }
      }

      async prendiDevices(): Promise<any> {

        try {

          const result = await this.pb.collection('devices').getList(1, 50, { '$autoCancel': false });
          let layouts = result.items;

        return layouts
        } catch (err) {
          console.log("Si è verificato un errore:", err);
          return []; // Restituisci un array vuoto in caso di errore
        }
      }


      async prendiDevice(device: any): Promise<any> {

        let layouts = await this.prendiLayouts();

        const l = layouts.find((r: any) =>
          r.type === device.type &&
          this.haveSameInstances(r.spots, device.spots) &&
          this.haveSameInstances(r.groups, device.groups)
        );

        localStorage.setItem('device', l.id);
        // Assicurati di includere questa istruzione return con il valore desiderato
      }

      async prendiLayoutId(id : any): Promise<any> {

        let layouts = await this.prendiLayouts()

        const l = layouts.find((r:any) =>
          r.id === id
         );

         return l
      }

      async prendiDeviceId(id : any): Promise<any> {

        let devices = await this.prendiDevices()

        const l = devices.find((r:any) =>
          r.id === id
         );

         return l
      }

      haveSameInstances(arr1: any[], arr2: any[]): boolean {
        // Verifica se la lunghezza degli array è diversa
        if (arr1.length !== arr2.length) {
          return false;
        }

        // Verifica se ogni elemento dell'array 1 è uguale all'elemento corrispondente nell'array 2
        return arr1.every((item, index) => item === arr2[index]);
      }


      async updateGroup(id : any, data: any){
        const record = await this.pb.collection('groups').update(id, data);
      }

      async prendiCategoriaId(id: any): Promise<any> {
        let c = await this.prendiCategorie();



        while (c.length === 0) {
          // Se l'array delle categorie è vuoto, attendi 100 millisecondi
          await new Promise(resolve => setTimeout(resolve, 100));
          c = await this.prendiCategorie();
        }


        const l = c.find((r: any) => r.id === id);

        return l;
      }





      async prendiSpotDaId(id : any): Promise<any> {
        let s = await this.prendiSpot()

        const l = s.find((r:any) =>
          r.id === id
         );

         return l
      }











}
