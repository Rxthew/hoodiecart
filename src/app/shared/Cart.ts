import { CartItem } from "./CartItem";

export class Cart {
    items: CartItem[] = [];

    subTotal() {
        return this.items
        .map((item)=> item.getItemsCost())
        .reduce((total, current) => total + current, 0)
    }
}