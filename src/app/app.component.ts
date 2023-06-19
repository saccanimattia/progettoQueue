import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'progettoQueue';
  id : any
  ip:any
  constructor(private router: Router){}

  ngOnInit():void{

    this.id = localStorage.getItem('device')
    this.ip = localStorage.getItem('indirizzoIp')
    console.log(this.ip)
    console.log(this.id)

    if (!this.id) {
      // L'ID è undefined, esegui il codice qui
      console.log("ID è undefined");
      this.router.navigate(['/primaConfigurazione']);
    } else {
      console.log(this.id)
      console.log("ID non è undefined");
      this.router.navigate(['/paginaPrincipale']);
    }
  }
}
