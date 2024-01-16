import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ItemService } from '../services/item/item.service';
import { AuthService } from '../services/auth.service';
import { ImageMapper } from '../shared/ImageMapper';
import { Item } from '../shared/Item';
import { Router } from '@angular/router';
import { CartService } from '../services/cart/cart.service';



@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent implements OnInit {

  public items:Item[] = [];
  public loading:boolean = true;


  public srcsAccess = new ImageMapper().srcsAccess;

  constructor(private itemService : ItemService, private router:Router, private authService: AuthService, private cartService: CartService){}

  setAPIItems(): void{
    this.itemService.getItems()
    .subscribe((data:Item[])=>{
      sessionStorage.setItem('items', JSON.stringify(data)); this.getFromStorage()})
  }

  getFromStorage():void {
    this.items = JSON.parse(sessionStorage.getItem('items') as string);
    this.loading = false;

  }

  getItems():void {
      sessionStorage.getItem('items') === null ? this.setAPIItems() : this.getFromStorage()
      
  }

  addToCart(item: Item):void {
    sessionStorage.setItem("cartCache", JSON.stringify(item))
    this.router.navigate(['/cart'])
    
  }

  ngOnInit(): void {
    this.getItems()
    this.authService.checkAuth() || this.router.navigate(['../'])
    
  }

}
 