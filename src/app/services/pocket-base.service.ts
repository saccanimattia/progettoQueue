import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';


@Injectable({
  providedIn: 'root'
})
export class PocketBaseService {
  private pb: PocketBase;

  constructor() {
    this.pb = new PocketBase('');
  }

  setIp() {
    const ipAddress = localStorage.getItem('indirizzoIp')!;
    this.pb = new PocketBase(ipAddress);
  }

  async checkIp(): Promise<boolean> {
    try {
      const result = await this.pb.collection('type').getList(1, 50);
      return true

    } catch (err) {
      console.log("Si è verificato un errore:", err);
    }
      return false
    }
}
