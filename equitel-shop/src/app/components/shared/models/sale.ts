import { Employee } from "./employee";

export interface Sale {
    id:number;
	fk_employee:Employee;
	nowDate:string;
	totalPrice:number;

}
