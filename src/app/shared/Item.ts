export class Item {
    public readonly id: number;
    public readonly name: string;
    public readonly price: number;

    constructor(id: number, name: string, price: number){
        this.id = id;
        this.name = name;
        this.price = price;

    }
};