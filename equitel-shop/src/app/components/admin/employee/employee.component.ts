import { Component } from '@angular/core';
import { EmployeeService } from '../../shared/services/employee.service';
import { Employee } from '../../shared/models/employee';
import { FormControl, FormGroup } from '@angular/forms';
import { CreateOrUpdateEmployeeReq } from '../../shared/interfaces/create-or-update-employee-req';
import { AuthService } from '../../shared/services/auth.service';
import { RoleService } from '../../shared/services/role.service';
import { Role } from '../../shared/models/role';
import { last } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  employeeList:Employee[];
  roleList:Role[];
  update:boolean = false;
  createReq:CreateOrUpdateEmployeeReq;
  formEmployee:FormGroup = new FormGroup({
    names:new FormControl(),
    LastName:new FormControl(),
    user:new FormControl(),
    pass:new FormControl(),
    role:new FormControl(),
    id:new FormControl(0)
  })
  constructor(private empService:EmployeeService,
    private authService:AuthService,
    private roleService:RoleService){}
  ngOnInit(){
    this.allEmployees();
    this.allRoles();
  }
  allEmployees(){
      this.empService.getAll().subscribe((res)=>{
        this.employeeList = res;
      })
  }
  allRoles(){
    this.roleService.getAllRoles().subscribe((res)=>{
      this.roleList = res;
    },(err)=>{
      console.error(err);
      
    })
  }
  createEmployee(){
    if (this.formEmployee.valid) {
      this.createReq={
        name:this.formEmployee.value.names,
        lastName:this.formEmployee.value.LastName,
        user:this.formEmployee.value.user,
        password:this.formEmployee.value.pass,
        fkRole:this.formEmployee.value.role,
        idEmpleado:this.formEmployee.value.id
      }
      this.empService.createEmployee(this.createReq).subscribe((resp)=>{
        console.log(resp);
        this.authService.notificationSuccess(resp.msg);
      },(err)=>{
        console.error(err);
      })
    }else{
      this.authService.notificationInfo("Debe llenar todos los campos")
    }
  }
  updateEmployee(){
    if (this.formEmployee.valid) {
      this.createReq={
        name:this.formEmployee.value.names,
        lastName:this.formEmployee.value.LastName,
        user:this.formEmployee.value.user,
        password:this.formEmployee.value.pass,
        fkRole:this.formEmployee.value.role,
        idEmpleado:this.formEmployee.value.id
      }
      this.empService.updateEmployee(this.createReq).subscribe((resp)=>{
        console.log(resp);
        this.authService.notificationSuccess(resp.msg);
      },(err)=>{
        console.error(err);
      })
    }else{
      this.authService.notificationInfo("Debe llenar todos los campos")
    }
  }

  getDataToUpdate(id:number){
    this.update = true;
    this.empService.getById(id).subscribe((res)=>{
      this.formEmployee.patchValue({
        names:res.name,
        LastName:res.lastName,
        user:res.user,
        pass:res.password,
        role:res.fkRole.id,
        id:res.idEmpleado
      });      
    },(err)=>{
      console.error(err);
    })
  }

  resetUpdate(){
    this.update = false;
    this.formEmployee.patchValue({
      names:'',
        LastName:'',
        user:'',
        pass:'',
        role:'',
        id:0
    });
  }
  deleteEmployee(id:number){
    Swal.fire({
      title: "¿Seguro desea eliminarlo?",
      text: "Se eliminará definitivamente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.empService.deleteEmployee(id).subscribe((res)=>{
          console.log(res);
          Swal.fire({
            title: "Eliminado!",
            text: res.msg,
            icon: "success",
            timer:2000
          }).then(()=>{
            window.location.reload();
          });
        },(err)=>{
          console.error(err);
        })
      }else{
        Swal.fire({
          title: "Cancelado",
          text: "Operación cancelada!",
          icon: "info",
          showConfirmButton:false,
          timer:2000
        })
      }
    });
  }
}
