import { Component, HostListener } from '@angular/core';
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


    if (!this.id) {
      this.router.navigate(['/primaConfigurazione']);
    } else {
      this.router.navigate(['/paginaPrincipale']);
    }
  }

}
