import { Role } from "./role";

export interface Employee {
    idEmpleado:number;
	name:string;
	lastName:string;
	user:string;
	password:string;
	fkRole:Role;
	active:number;
}
