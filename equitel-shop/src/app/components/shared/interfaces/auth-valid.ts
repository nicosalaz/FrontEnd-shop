import { Employee } from "../models/employee";

export interface AuthValid {
    employee:Employee;
	privateEmployee:string;
}
