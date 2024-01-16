import { Item } from "./Item";

export class CartItem {
    
    public amount: number = 1;
    public item;

    constructor(item: Item, amount: number){
        this.item = item;
        this.amount = amount;

    }

    getItemsCost(){
        return this.item.price * this.amount
    }
}