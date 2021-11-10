import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { fr_FR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxMaskModule, IConfig } from 'ngx-mask';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import  {NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';


import { LoginComponent } from './components/login/login/login.component';
import { ListCustomersComponent } from './components/customers/list-customers/list-customers.component';
import { AddCustomerComponent } from './components/customers/add-customer/add-customer.component';
import { AddPackageComponent } from './components/packages/add-package/add-package.component';
import { ListPackagesComponent } from './components/packages/list-packages/list-packages.component';
import { AddPolicyComponent } from './components/policy/add-policy/add-policy.component';
import { ListPoliciesComponent } from './components/policy/list-policies/list-policies.component';
import { HeadersComponent } from './components/main/headers/headers.component';
import { FootersComponent } from './components/main/footers/footers.component';
import { NavbarsComponent } from './components/main/navbars/navbars.component';
import { SidebarsComponent } from './components/main/sidebars/sidebars.component';
import { ContentComponent } from './components/main/content/content.component';
import { BreadcrumbComponent } from './components/main/breadcrumb/breadcrumb.component';
import { MainComponent } from './components/main/main/main.component';
import { InterceptorService } from './services/interceptors/interceptor.service';
import { ShowPolicyComponent } from './components/policy/show-policy/show-policy.component';
import { EditPolicyComponent } from './components/policy/edit-policy/edit-policy.component';
import { ListAgencyComponent } from './components/agency/list-agency/list-agency.component';
import { AddSubscriberComponent } from './components/subscribers/add-subscriber/add-subscriber.component';
import { ListSubscriberComponent } from './components/subscribers/list-subscriber/list-subscriber.component';
import { AddCurrencyComponent } from './components/currencies/add-currency/add-currency.component';
import { ListCurrenciesComponent } from './components/currencies/list-currencies/list-currencies.component';
import { AddAgencyComponent } from './components/agency/add-agency/add-agency.component';
import { NoThousandPipe } from './no-thousand.pipe';
import { AppConfigService } from './services/app-config.service';
import { AddUserComponent } from './components/users-management/add-user/add-user.component';
import { ListUsersComponent } from './components/users-management/list-users/list-users.component';
import { ResetPasswordComponent } from './components/users-management/reset-password/reset-password.component';

registerLocaleData(fr);

//Add this function as initiating load method first
export function loadConfiguration(configService: AppConfigService) {
  return () => configService.loadAppConfig();
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListCustomersComponent,
    AddCustomerComponent,
    AddPackageComponent,
    ListPackagesComponent,
    AddPolicyComponent,
    ListPoliciesComponent,
    HeadersComponent,
    FootersComponent,
    NavbarsComponent,
    SidebarsComponent,
    ContentComponent,
    BreadcrumbComponent,
    MainComponent,
    ShowPolicyComponent,
    EditPolicyComponent,
    ListAgencyComponent,
    AddSubscriberComponent,
    ListSubscriberComponent,
    AddUserComponent,
    ListUsersComponent,
    ResetPasswordComponent,
    AddCurrencyComponent,
    ListCurrenciesComponent,
    AddAgencyComponent,
    NoThousandPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxMaskModule.forRoot(),
    NzFormModule,
    NzIconModule,
    NzLayoutModule,
    NzButtonModule,
    NzFormModule,
    NzCheckboxModule,
    NzInputModule,
    NzBreadCrumbModule,
    NzCollapseModule,
    NzDatePickerModule,
    NzDividerModule,
    NzInputNumberModule,
    NzMenuModule,
    NzMessageModule,
    NzModalModule,
    NzModalModule,
    NzSelectModule,
    NzSpinModule,
    NzStepsModule,
    NzTableModule,
    NzToolTipModule,  
  ],
  
  providers: [
    
    {
      provide: NZ_I18N, 
      useValue: fr_FR 
    },
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: InterceptorService, 
      multi: true
    },
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfiguration,
      deps: [AppConfigService],
      multi: true,
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
