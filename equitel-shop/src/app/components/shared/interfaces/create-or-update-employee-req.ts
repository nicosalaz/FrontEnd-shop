export interface CreateOrUpdateEmployeeReq {
    idEmpleado:number;
	name: string;
	lastName: string;
	user: string;
	password: string;
	fkRole:number;
}
