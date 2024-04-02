import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { EmployeeComponent } from './employee/employee.component';
import { ProductComponent } from './product/product.component';
import { SaleComponent } from './sale/sale.component';

const routes: Routes = [
  {path:'',component:AdminComponent},
  {path:'empleados',component:EmployeeComponent},
  {path:'productos',component:ProductComponent},
  {path:'ventas',component:SaleComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
