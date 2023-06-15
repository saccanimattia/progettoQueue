import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PocketBaseService {
  private pb: PocketBase;

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
      const result = await this.pb.collection('type').getList(1, 50);
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
      const result = await this.pb.collection('categoria').getList(1, 50);
      let categorie = result.items;
      return categorie
    } catch (err) {
      console.log("Si è verificato un errore:", err);
    }
      return []
    }


    downloadFile(fileUrl : any) {

      this.http.get(fileUrl, { responseType: 'blob' }).subscribe((response: Blob) => {
        const blob = new Blob([response], { type: response.type });

        // Crea un URL oggetto per il blob
        const url = window.URL.createObjectURL(blob);

        // Crea un link temporaneo per il download del file
        const link = document.createElement('a');
        link.href = url;
        link.download = 'file.pdf'; // Specifica il nome del file da scaricare
        link.click();

        // Rilascia la risorsa URL oggetto
        window.URL.revokeObjectURL(url);
      });
    }





}
