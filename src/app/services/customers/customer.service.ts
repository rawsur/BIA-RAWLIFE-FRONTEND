import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customers/customer';
import { AppConfigService } from '../app-config.service';
import {LoginService} from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor( private httpClient : HttpClient,  private login:LoginService  , private appConfig:AppConfigService ) {}

  private url:string = this.appConfig.apiBaseUrl+"api/v1/customer/";

  getCustomers(): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headerDict = {
      "Access-Control-Allow-Origin" : "*",
      Authorization: `${token}`,
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict)
    };
    return this.httpClient.get(this.url+"list" , requestOptions);
  }


  getCustomerById( id:number ) : Observable<any>  {
    const token = sessionStorage.getItem('token');
    const headerDict = {
      "Access-Control-Allow-Origin" : "*",
      Authorization: `${token}`,
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict)
    };
    return this.httpClient.get( this.url+"get/"+id, requestOptions );
  }


  getCustomerByUsername( fname:string ): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headerDict = {
      "Access-Control-Allow-Origin" : "*",
      Authorization: `${token}`,
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict)
    };
    
    return this.httpClient.get( this.url+"get/fname/"+fname , requestOptions );

  }


  saveCustomer( customer:Customer ) : Observable<Customer> {

    const token = sessionStorage.getItem('token');
    const headerDict = {
      "Access-Control-Allow-Origin" : "*",
      Authorization: `${token}`,
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict)
    };
    
    return this.httpClient.post<Customer>( this.url+"save" , customer, requestOptions );

  }


  updateCustomer( id:number , customer:any ) : Observable<any> {
    return this.httpClient.put( this.url+"update/"+id , customer);
  }


  deleteCustomer( id:number , customer:any ) : Observable<any> {
    return this.httpClient.delete( this.url + "delete/"+id , customer);
  }
  
}
