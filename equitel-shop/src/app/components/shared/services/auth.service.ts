import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthValid } from '../interfaces/auth-valid';
import { HttpClient } from '@angular/common/http';
import { AuthRequest } from '../interfaces/auth-request';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlGeneral: string = environment.urlBack;
  constructor(private http: HttpClient) { }

  login(authLogin: AuthRequest): Observable<AuthValid> {
    const url = this.urlGeneral + "employee/auth";
    return this.http.post<AuthValid>(url, authLogin);
  }

  public set setIEmployee(idEmployee: string) {
    localStorage.setItem("idEmployee", idEmployee);
  }
  public get getIdEmployee(): number {
    return Number(localStorage.getItem("idEmployee"));
  }


  public set setIdRole(idRole: number) {
    localStorage.setItem("idRole", idRole.toString());
  }

  public get getIdRole(): number {
    return Number(localStorage.getItem("idRole"));
  }

  public set setAuth(authenticate: boolean) {
    localStorage.setItem("authenticate", authenticate.toString());
  }

  public get getAuth(): boolean {
    return Boolean(localStorage.getItem("authenticate"));
  }

  logout() {
    localStorage.clear();
  }

  notificationError(msg: string) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: msg,
      showConfirmButton: false,
      timer: 1500
    })
  }

  notificationInfo(msg: string) {
    Swal.fire({
      icon: "info",
      title: "Atención!",
      text: msg,
      showConfirmButton: false,
      timer: 1500
    })
  }
  notificationSuccess(msg: string) {
    Swal.fire({
      icon: "success",
      title: "Éxito!",
      text: msg,
      showConfirmButton: false,
      timer: 1500
    }).then((res)=>{
      window.location.reload();
    })
  }
}