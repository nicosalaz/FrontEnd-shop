import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Sale } from '../models/sale';
import { CreateSaleReq } from '../interfaces/create-sale-req';
import { ResponseGeneric } from '../interfaces/response-generic';
import { DetailSaleV } from '../models/detail-sale-v';
import { Report } from '../models/report';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  urlGeneral:string=environment.urlBack;
  constructor(private http:HttpClient) { }

  getAllSales():Observable<Sale[]>{
    const url = this.urlGeneral+"sale";
    return this.http.get<Sale[]>(url);
  }

  createSale(req:CreateSaleReq):Observable<DetailSaleV[]>{
    const url = this.urlGeneral+"sale";
    return this.http.post<DetailSaleV[]>(url,req);
  }
  reportSale():Observable<Report[]>{
    const url = this.urlGeneral+"sale/report";
    return this.http.get<Report[]>(url);
  }
}
