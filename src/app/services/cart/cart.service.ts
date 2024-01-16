import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../../shared/Cart';
import { Item } from '../../shared/Item';
import { CartItem } from '../../shared/CartItem';
import { APIHandler } from '../../shared/ApiHandler';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CartService extends APIHandler {


  private cart = new Cart()

  constructor(private http: HttpClient){
    super()
    
  }

  public importCartItems(): Observable<Item[]> | undefined {
    const id = sessionStorage.getItem('userId');
    if(id === null){
      return
    }
    return this.http.get<Item[]>(`${this.cartUrl}/api/Items/${id}`)

  }

  private addItemToCart(item : Item): void {
    this.cart.items = [...this.cart.items, new CartItem(item,1)] 
    sessionStorage.getItem("userId") !== null ? 
    this.http.put(`${this.cartUrl}/api/User/cart/new`,{itemId: item.id, userId: sessionStorage.getItem('userId')}).subscribe() : false;
  }

  public addCartFlow(item: Item): void {
    const currentItem = this.cart.items.filter(cartItem => cartItem.item.id === item.id)[0];
    currentItem ? this.incrementItem(item.id, true) : this.addItemToCart(item)
  }

  public removeItem(itemId: number): void {
    if(this.cart.items.every((cartItem) => cartItem.item.id !== itemId)){
      return
    }
    this.cart.items = this.cart.items.filter(cartItem => cartItem.item.id !== itemId)
    sessionStorage.getItem("userId") !== null ? 
    this.http.put(`${this.cartUrl}/api/User/cart/remove`,{itemId: itemId, userId: sessionStorage.getItem('userId')}).subscribe() : false;
  }

  public incrementItem(itemId: number, expedite: boolean = false): void {
    const cartItem = this.cart.items.find(i => i.item.id === itemId);
    cartItem ? Object.assign(cartItem, {amount: cartItem.amount + 1}) : false;
    const user = sessionStorage.getItem("userId") !== null
    if(expedite){
      user ? this.http.put(`${this.cartUrl}/api/User/cart/increment`,{itemId: itemId, userId: sessionStorage.getItem('userId')}).subscribe() : false
      return
    }
    user ? setTimeout(() => this.http.put(`${this.cartUrl}/api/User/cart/increment`,{itemId: itemId, userId: sessionStorage.getItem('userId')}).subscribe(), 2000) : false;
  }

  public decrementItem(itemId: number): void {
    const cartItem = this.cart.items.find(i => i.item.id === itemId);
    cartItem && cartItem.amount === 1 ? this.removeItem(itemId) : false;
    cartItem ? Object.assign(cartItem, {amount: cartItem.amount - 1}) : false;
    sessionStorage.getItem("userId") !== null ? 
    setTimeout( () => this.http.put(`${this.cartUrl}/api/User/cart/decrement`,{itemId: itemId, userId: sessionStorage.getItem('userId')}).subscribe(), 2000) : false;

  }

  public clearCart(): void{
    this.cart.items = []
    const userId = sessionStorage.getItem("userId") 
    userId !== null ? this.http.put(`${this.cartUrl}/api/User/cart/clear`,{id: userId}).subscribe() : false
  }

  public returnCart(): Cart {
    return this.cart
  }

}
