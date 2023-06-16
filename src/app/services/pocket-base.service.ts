import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PocketBaseService {
  private pb: PocketBase;
  r : any[] = []

  constructor(private http: HttpClient) {
    this.pb = new PocketBase('');
  }

  setIp() {
    const ipAddress = localStorage.getItem('indirizzoIp')!;
    this.pb = new PocketBase(ipAddress);
  }

  async checkIp(): Promise<boolean> {
    try {
      console.log(this.pb);
      const result = await this.pb.collection('layouts').getList(1, 50);
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
      console.log(this.pb)
      const result = await this.pb.collection('groups').getList(1, 50);
      let categorie = result.items;
      return categorie
    } catch (err) {
      console.log("Si è verificato un errore:", err);
    }
      return []
    }

    async prendiSpot(): Promise<any[]> {
      try {
        console.log(this.pb)
        const result = await this.pb.collection('spots').getList(1, 50);
        let spot = result.items;
        console.log(spot)
        return spot

      } catch (err) {
        console.log("Si è verificato un errore:", err);
      }
        return []
      }

    async prendiRisorse(): Promise<any[]> {
      try {
        console.log(this.pb)
        const result = await this.pb.collection('medias').getList(1, 50);
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

      async createDevice(device : any): Promise<any> {
        console.log(device)
        try {
          const record = await this.pb.collection('layouts').create(device);
        } catch (err) {
          console.log("Si è verificato un errore:", err);
          return []; // Restituisci un array vuoto in caso di errore
        }
      }

      async prendiLayouts(): Promise<any> {

        try {
          console.log(this.pb)
          const result = await this.pb.collection('layouts').getList(1, 50);
          let layouts = result.items;
          console.log(layouts)
        return layouts
        } catch (err) {
          console.log("Si è verificato un errore:", err);
          return []; // Restituisci un array vuoto in caso di errore
        }
      }


      async prendiDevice(device : any): Promise<any> {
        console.log("deviiice")
        console.log(device)
        let layouts = await this.prendiLayouts()
        console.log(layouts)
        const l = layouts.find((r:any) =>
          r.type === device.type &&
          this.haveSameInstances(r.spots, device.spots) &&
          this.haveSameInstances(r.groups, device.groups)
         );
         console.log(l.id)
         localStorage.setItem('device', l.id)
      }

      haveSameInstances(arr1: any[], arr2: any[]): boolean {
        // Verifica se la lunghezza degli array è diversa
        if (arr1.length !== arr2.length) {
          return false;
        }

        // Verifica se ogni elemento dell'array 1 è uguale all'elemento corrispondente nell'array 2
        return arr1.every((item, index) => item === arr2[index]);
      }








}
