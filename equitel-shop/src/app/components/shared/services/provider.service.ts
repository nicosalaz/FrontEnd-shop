import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Provider } from '../models/provider';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  urlGeneral:string=environment.urlBack;
  constructor(private http:HttpClient) { }

  getAllProviders():Observable<Provider[]>{
    const url = this.urlGeneral+"provider";
    return this.http.get<Provider[]>(url);
  }
}
