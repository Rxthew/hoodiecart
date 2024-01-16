import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hoodiecart';

  constructor(private authService: AuthService, private router: Router){
    this.router.events.subscribe((event)=>{
      if(event instanceof NavigationEnd){
        const currentRoute = this.router.url;
        currentRoute === '/' ? this.authService.checkAuth() && this.router.navigate(['/store']) : false
      }
    })
    

  }

  ngOnInit():void {
      

  }

}
