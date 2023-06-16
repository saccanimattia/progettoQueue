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






}
