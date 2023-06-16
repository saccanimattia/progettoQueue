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
  id : any
  constructor(private router: Router){}

  ngOnInit():void{

    this.id = localStorage.getItem('device')

    if(this.id == '' || this.id == null){
      this.router.navigate(['/primaConfigurazione']);
    }
    else{
      this.router.navigate(['/paginaPrincipale']);
    }
  }
}
