import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAgencyComponent } from './components/agency/add-agency/add-agency.component';
import { ListAgencyComponent } from './components/agency/list-agency/list-agency.component';
import { AddCurrencyComponent } from './components/currencies/add-currency/add-currency.component';
import { ListCurrenciesComponent } from './components/currencies/list-currencies/list-currencies.component';
import { ListCustomersComponent } from './components/customers/list-customers/list-customers.component';
import { LoginComponent } from './components/login/login/login.component';
import { MainComponent } from './components/main/main/main.component';
import { AddPackageComponent } from './components/packages/add-package/add-package.component';
import { ListPackagesComponent } from './components/packages/list-packages/list-packages.component';
import { AddPolicyComponent } from './components/policy/add-policy/add-policy.component';
import { EditPolicyComponent } from './components/policy/edit-policy/edit-policy.component';
import { ListPoliciesComponent } from './components/policy/list-policies/list-policies.component';
import { AddSubscriberComponent } from './components/subscribers/add-subscriber/add-subscriber.component';
import { ListSubscriberComponent } from './components/subscribers/list-subscriber/list-subscriber.component';
import { AddUserComponent } from './components/users-management/add-user/add-user.component';
import { ListUsersComponent } from './components/users-management/list-users/list-users.component';
import { ResetPasswordComponent } from './components/users-management/reset-password/reset-password.component';
import { AuthGuardService } from './services/login/auth-guard.service';

const routes: Routes = [
  { path:'', component:LoginComponent },
  { path:'logout', component:LoginComponent },

  {
    path:'agency', component:MainComponent,children:
    [
      {path:'add-agency', component:AddAgencyComponent , canActivate:[AuthGuardService] },
      {path:'list-agency', component:ListAgencyComponent , canActivate:[AuthGuardService] },
    ]
  },

  {
    path:'currency', component:MainComponent,children:
    [
      {path:'add-currency', component:AddCurrencyComponent , canActivate:[AuthGuardService] },
      {path:'list-currency', component:ListCurrenciesComponent , canActivate:[AuthGuardService] },
    ]
  },
  
  {
    path:'customer', component:MainComponent,children:
    [
      {path:'add-customer', component:AddPolicyComponent , canActivate:[AuthGuardService] },
      {path:'list-customer', component:ListCustomersComponent , canActivate:[AuthGuardService] },
      { path: 'edit-customer/:id', component: EditPolicyComponent }
    ]
  },

  {
    path:'package', component:MainComponent,children:
    [
      {path:'add-package', component:AddPackageComponent , canActivate:[AuthGuardService] },
      {path:'list-package', component:ListPackagesComponent , canActivate:[AuthGuardService] },
      { path: 'edit-package/:id', component: EditPolicyComponent }
    ]
  },

  {
    path:'policy', component:MainComponent,children:
    [
          {path:'add-policy', component:AddPolicyComponent , canActivate:[AuthGuardService] },
          {path:'list-policy', component:ListPoliciesComponent , canActivate:[AuthGuardService] },
          { path: 'edit-policy/:id', component: EditPolicyComponent }
    ]
  },

  {
    path:'subscriber', component:MainComponent,children:
    [
      {path:'add-subscriber', component:AddSubscriberComponent , canActivate:[AuthGuardService] },
      {path:'list-subscriber', component:ListSubscriberComponent , canActivate:[AuthGuardService] },
    ]
  },

  {
    path:'user', component:MainComponent,children:
    [
      {path:'add-user', component:AddUserComponent , canActivate:[AuthGuardService] },
      {path:'list-user', component:ListUsersComponent , canActivate:[AuthGuardService] },
      {path:'password-change', component:ResetPasswordComponent , canActivate:[AuthGuardService] },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
