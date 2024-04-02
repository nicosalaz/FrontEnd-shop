import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/shared/login/login.component';
import { RoleGuardGuard } from './components/shared/guards/role-guard.guard';

const routes: Routes = [
    {path:'',pathMatch: 'full',redirectTo: 'auth'},
    {path:'auth',component:LoginComponent},
    {path:'admin',
    loadChildren:()=>import('./components/admin/admin.module').then(m=>m.AdminModule),
    canActivate:[RoleGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
