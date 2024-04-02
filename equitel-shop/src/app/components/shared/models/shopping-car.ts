import { Product } from "./product";

export interface ShoppingCar {
    id:number;
	fkProduct: Product;
	price:number;
	amount:number;
	active:number;
	fkEmployee:number;
}
