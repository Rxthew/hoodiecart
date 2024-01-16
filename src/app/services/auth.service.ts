import { Injectable } from '@angular/core';
import { APIHandler } from '../shared/ApiHandler';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends APIHandler {
  constructor(public http: HttpClient, private router:Router) {
    super()
   }

  checkAuth(): boolean{

    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');

    if(username === null || password === null){
      return false
    }
    const john = 'John Doe' + 'johndoe';
    const jane = 'Jane Doe' + 'janedoe';
    const check = username + password;
    return check === john || check === jane 
      
  }

  okAuth(username: string){
    const result = this.http.get(`${this.cartUrl}/api/User/${username}`);
    result.subscribe((user)=>{
      sessionStorage.setItem('userId', (user as any).id);
      sessionStorage.setItem('username',(user as any).username);
      sessionStorage.setItem('password', (user as any).password);
      this.router.navigate(['/store'])
    })
  }

  
}
