import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardGuard implements CanActivate {
  constructor(private authService:AuthService,private ruta:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.checkAuth();
  }

  private checkAuth():boolean{
    const authenticate = this.authService.getAuth;
    if (authenticate != undefined && authenticate == true) {
      return true;
    }
    this.ruta.navigate(['/auth'])
    return false;
  }
  
}
