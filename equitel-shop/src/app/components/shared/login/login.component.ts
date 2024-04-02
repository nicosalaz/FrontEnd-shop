import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthRequest } from '../interfaces/auth-request';
import { AuthValid } from '../interfaces/auth-valid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formLogin:FormGroup=new FormGroup({
    user :new FormControl(""),
    password:new FormControl("")
  })
  req:AuthRequest;
  constructor(private authService:AuthService,private route:Router){}
  ngOnInit(){

  }
  authenticated(){
    this.req = this.formLogin.value;
    console.log(this.req);
    this.authService.login(this.req).subscribe((res)=>{
      console.log(res);
      this.authService.setIEmployee=res.employee.idEmpleado.toString();
      this.authService.setIdRole=res.employee.fkRole.id;
      this.authService.setAuth=true;
      this.route.navigate(['admin']).then((res)=>{        
        window.location.reload()
      });
    },
    (err)=>{
      console.error(err);
    })
  }
}
