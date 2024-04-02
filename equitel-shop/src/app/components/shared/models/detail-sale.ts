import { Product } from "./product";
import { Sale } from "./sale";

export interface DetailSale {
    id:number;
    fkProduct:Product;
    price:number;
    amount:number;
    fkSale:Sale;
}
