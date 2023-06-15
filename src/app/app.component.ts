import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'progettoQueue';
  ip : any
  constructor(private router: Router){}

  ngOnInit():void{

    this.ip = localStorage.getItem('indirizzoIp')
    this.id = localStorage.getItem('id')
    console.log(this.ip)
    if(this.ip == '' ){
      this.router.navigate(['/primaConfigurazione']);
    }
    else{
      this.router.navigate(['/paginaPrincipale']);
    }
  }
}
