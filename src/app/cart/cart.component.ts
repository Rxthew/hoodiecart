import { Component, OnInit } from '@angular/core';
import { Cart } from '../shared/Cart';
import { CartService } from '../services/cart/cart.service';
import { CartItem } from '../shared/CartItem';
import { Item } from '../shared/Item';
import { ImageMapper } from '../shared/ImageMapper';
import { CurrencyPipe } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  public cart:Cart = this.cartService.returnCart()
  public loading:boolean = true;
  public srcsAccess = new ImageMapper().srcsAccess;

  constructor(private cartService: CartService, private authService: AuthService, public router: Router){
    this.router.events.subscribe((event)=>{
      if(event instanceof NavigationEnd){
        this.loading = true;
        const check = this.authService.checkAuth() 
        check && this.getItems();
      }
    })

  }

  addToCart(){
    const item = sessionStorage.getItem('cartCache');
    item ? this.cartService.addCartFlow(JSON.parse(item)) : false;
    sessionStorage.removeItem('cartCache')
  }

  clearCart(){
    this.cartService.clearCart()
  }

  removeFromCart(cartItem: CartItem){
    this.cartService.removeItem(cartItem.item.id)
  }

  incrementAmount(cartItem: CartItem){
    this.cartService.incrementItem(cartItem.item.id)
  }

  decrementAmount(cartItem: CartItem){
    this.cartService.decrementItem(cartItem.item.id)
  }

  getItems():void {
    const imported = this.cartService.importCartItems();
    if(imported){
      imported.subscribe((data:any[])=>{
       const cartItems = data.map((apiCartItem) => new CartItem(new Item(apiCartItem.id, apiCartItem.name, apiCartItem.price), apiCartItem.amount))
       this.cart.items = cartItems;
       this.addToCart();
       this.loading = false;
      })
    }
    
  } 

  ngOnInit(): void {
    this.authService.checkAuth() || this.router.navigate(['../'])
    
    
    
  }


}

