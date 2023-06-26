import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  private audio: HTMLAudioElement;

  constructor() {
    this.audio = new Audio();
  }

  setPath(filePath: string): void {
    this.audio.src = filePath;
    console.log(this.audio.src);
  }

  playSound(): void {
    this.audio.play();
  }
}
