import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  private audioContext: AudioContext;

  constructor() {
    this.audioContext = new AudioContext();
  }

  playSound(filePath: string): void {
    const audio = new Audio();
    audio.src = filePath;

    const source = this.audioContext.createMediaElementSource(audio);
    source.connect(this.audioContext.destination);

    audio.play();
  }
}
