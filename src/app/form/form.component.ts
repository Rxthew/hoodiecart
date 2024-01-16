import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/User';
import { APIHandler } from '../shared/ApiHandler';




@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent extends APIHandler{

  constructor(public http: HttpClient, public authService: AuthService){
    super()
  }

  model = new User('', '');
  unauth = false;


  onSubmit = ()=>{
    this.unauth = false;    
    const result = this.http.post(`${this.cartUrl}/api/User`,this.model,{observe: 'response'})
    result.subscribe(
      {
        next: (response) => response.status === 200 ? this.authService.okAuth(this.model.username) : console.log(response), 
        error: (error) => error.status === 401 ? this.unauth = true : console.log(error)
      })

  }


}
