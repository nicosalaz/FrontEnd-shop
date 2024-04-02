import { DetailSale } from "./detail-sale";
import { Sale } from "./sale";

export interface Report {
    sale:Sale;
    detailList:DetailSale[];
}
