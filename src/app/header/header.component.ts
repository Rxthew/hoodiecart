import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
   constructor(private authService: AuthService, public router: Router){
    this.router.events.subscribe((event)=>{
      if(event instanceof NavigationEnd){
        this.authOK = this.authService.checkAuth()
        this.username = sessionStorage.getItem('username')
      }
    })

   }
   public authOK:boolean = this.authService.checkAuth(); 
   public username:string | null = sessionStorage.getItem('username');

   logOut(){
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
    sessionStorage.removeItem('userId');
    this.router.navigate(['/hoodiecart/'])
   }

   

}

