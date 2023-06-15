import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'progettoQueue';
  ip = localStorage.getItem('indirizzoIp')

  constructor(private router: Router){}

  ngOnInit():void{
    if(this.ip == null){
      this.router.navigate(['/primaConfigurazione']);
    }
  }
}
