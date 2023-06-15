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
    this.ip = localStorage.setItem('indirizzoIp', '')
    this.ip = localStorage.getItem('indirizzoIp')
    console.log(this.ip)
    if(this.ip == ''){
      this.router.navigate(['/primaConfigurazione']);
    }
    else{
      this.router.navigate(['/ciao']);
    }
  }
}
