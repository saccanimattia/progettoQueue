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

    localStorage.removeItem('device')
    this.ip = localStorage.getItem('indirizzoIp')
    console.log(this.ip)
    console.log(this.id)

    if(this.id == '' || this.id == null){
      this.router.navigate(['/primaConfigurazione']);
    }
    else{
      this.router.navigate(['/paginaPrincipale']);
    }
  }
}
