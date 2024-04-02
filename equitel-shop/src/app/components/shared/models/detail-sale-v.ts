import { Timestamp } from "rxjs";
import { Employee } from "./employee";
import { Product } from "./product";

export interface DetailSaleV {
    idSale:number;
    idDetail:number;
    fk_employee:Employee;
    nowDate:Date;
    fkProduct:Product;
    amount:number;
    price:number;
}
