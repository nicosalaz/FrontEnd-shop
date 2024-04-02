import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { EmployeeComponent } from './employee/employee.component';
import { HeaderComponent } from '../shared/header/header.component';
import { ProductComponent } from './product/product.component';
import { SaleComponent } from './sale/sale.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminComponent,
    EmployeeComponent,
    ProductComponent,
    SaleComponent
  ],
  exports:[
    EmployeeComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
