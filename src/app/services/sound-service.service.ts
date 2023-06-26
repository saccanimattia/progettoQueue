import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  private audioContext: AudioContext;
  filePath : any

  constructor() {
    this.audioContext = new AudioContext();
  }

  setPath(p:any){
    this.filePath = p
    console.log(this.filePath)
  }

  playSound(): void {
    const audio = new Audio();
    audio.src = this.filePath;

    const source = this.audioContext.createMediaElementSource(audio);
    source.connect(this.audioContext.destination);

    audio.play();
  }
}
