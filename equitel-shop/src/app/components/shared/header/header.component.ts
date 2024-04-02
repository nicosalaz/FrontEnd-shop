import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isAdmin: boolean = this.authService.getIdRole==1?true:false;
  constructor(private authService:AuthService,private route:Router){}
  logout() {
    this.authService.logout();
    window.location.reload();
  }
}
