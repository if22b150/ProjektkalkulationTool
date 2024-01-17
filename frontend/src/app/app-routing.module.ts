import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {customerGuard} from "./guards/customer.guard";
import {adminGuard} from "./guards/admin.guard";
import {authGuard} from "./guards/auth.guard";

const routes: Routes = [
  {
    path: 'customer',
    canActivate: [customerGuard],
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)
  },
  {
    path: 'auth',
    canActivate: [authGuard],
    loadChildren: () => import('./authorization/authorization.module').then(m => m.AuthorizationModule)
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {path: '**', redirectTo: 'auth'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
