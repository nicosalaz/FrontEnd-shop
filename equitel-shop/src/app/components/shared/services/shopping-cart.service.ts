import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ResponseGeneric } from '../interfaces/response-generic';
import { CreateShoppingCarReq } from '../interfaces/create-shopping-car-req';
import { AuthService } from './auth.service';
import { ShoppingCar } from '../models/shopping-car';
import { UpdateShoppingCartReq } from '../interfaces/update-shopping-cart-req';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  urlGeneral:string=environment.urlBack;
  constructor(private http:HttpClient,private authService:AuthService) { }

  addShopingCart(req:CreateShoppingCarReq):Observable<ResponseGeneric>{
    const url = this.urlGeneral+"shoppingCar";
    return this.http.post<ResponseGeneric>(url,req);
  }

  getCart():Observable<ShoppingCar[]>{
    const url = this.urlGeneral+"shoppingCar?fkEmployee="+this.authService.getIdEmployee;
    return this.http.get<ShoppingCar[]>(url);
  }
  deleteItem(id:number):Observable<ResponseGeneric>{
    const url = this.urlGeneral+"shoppingCar?id="+id;
    return this.http.delete<ResponseGeneric>(url);
  }
  modifyItem(req:UpdateShoppingCartReq):Observable<ResponseGeneric>{
    const url = this.urlGeneral+"shoppingCar";
    return this.http.patch<ResponseGeneric>(url,req);
  }
  
}
