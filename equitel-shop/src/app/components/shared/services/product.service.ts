import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Product } from '../models/product';
import { ResponseGeneric } from '../interfaces/response-generic';
import { CreateOrUpdateProductReq } from '../interfaces/create-or-update-product-req';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  urlGeneral:string=environment.urlBack;
  constructor(private http:HttpClient) { }
  getAllProducts():Observable<Product[]>{
    const url = this.urlGeneral+"product";
    return this.http.get<Product[]>(url);
  }
  createProduct(req:CreateOrUpdateProductReq):Observable<ResponseGeneric>{
    const url = this.urlGeneral+"product";
    return this.http.post<ResponseGeneric>(url,req);
  }
  updateProduct(req:CreateOrUpdateProductReq):Observable<ResponseGeneric>{
    const url = this.urlGeneral+"product";
    return this.http.patch<ResponseGeneric>(url,req);
  }
  deleteProduct(id:number):Observable<ResponseGeneric>{
    const url = this.urlGeneral+"product?id="+id;
    return this.http.delete<ResponseGeneric>(url);
  }
}
