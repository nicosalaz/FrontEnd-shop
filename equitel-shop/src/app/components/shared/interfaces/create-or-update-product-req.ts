export interface CreateOrUpdateProductReq {
    id: number;
	name: string;
	description: string;
	price: number;
	model: string;
	existence: number;
	fkProvider: number;
}
