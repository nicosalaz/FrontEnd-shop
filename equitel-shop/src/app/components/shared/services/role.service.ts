import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  urlGeneral:string=environment.urlBack;
  constructor(private http:HttpClient) { }

  getAllRoles():Observable<Role[]>{
    const url = this.urlGeneral+"role";
    return this.http.get<Role[]>(url);
  }
}
