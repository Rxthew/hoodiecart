import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../../shared/Item';
import { APIHandler } from '../../shared/ApiHandler';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService extends APIHandler {
  

  constructor(private http: HttpClient) {
    super()
  }

  getItems(): Observable<Item[]>{
    return this.http.get<Item[]>(`${this.cartUrl}/api/items`)
    
  }

}
