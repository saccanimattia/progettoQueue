import { Component } from '@angular/core';
import {  Router } from '@angular/router';



@Component({
  selector: 'app-configurazione',
  templateUrl: './configurazione.component.html',
  styleUrls: ['./configurazione.component.scss']
})
export class ConfigurazioneComponent {

  constructor(private router : Router){}
  i = 0;

  ngOnInit(){
    this.i = 2;
  }

  increment(){
    this.i++;
    if(this.i==4){
      this.router.navigate(['/paginaPrincipale']);
    }
  }




}
