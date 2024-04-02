import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Employee } from '../models/employee';
import { CreateOrUpdateEmployeeReq } from '../interfaces/create-or-update-employee-req';
import { ResponseGeneric } from '../interfaces/response-generic';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  urlGeneral:string=environment.urlBack;
  constructor(private http:HttpClient) { }
  getAll():Observable<Employee[]>{
    const url = this.urlGeneral+"employee";
    return this.http.get<Employee[]>(url);
  }
  createEmployee(req:CreateOrUpdateEmployeeReq):Observable<ResponseGeneric>{
    const url = this.urlGeneral+"employee";
    return this.http.post<ResponseGeneric>(url,req);
  }
  getById(id:number):Observable<Employee>{
    const url = this.urlGeneral+"employee/update?idEmpleado="+id;
    return this.http.get<Employee>(url);
  }
  updateEmployee(req:CreateOrUpdateEmployeeReq):Observable<ResponseGeneric>{
    const url = this.urlGeneral+"employee";
    return this.http.patch<ResponseGeneric>(url,req);
  }
  deleteEmployee(id:number): Observable<ResponseGeneric>{
    const url = this.urlGeneral+"employee?id="+id;
    return this.http.delete<ResponseGeneric>(url);
  }
}
