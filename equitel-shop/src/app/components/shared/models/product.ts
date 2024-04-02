import { Provider } from "./provider";

export interface Product {
    id:number;
	name:string;
	description:string;
	price:number;
	model:string;
	existence:number;
	active:number;
	fkProvider:Provider;
}
