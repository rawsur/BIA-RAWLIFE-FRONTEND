import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from 'src/app/models/account/account';
import { AppConfigService } from '../app-config.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  

  constructor( private httpClient : HttpClient , private appConfig:AppConfigService ) { }

  private url:string=this.appConfig.apiBaseUrl+"api/v1/account/";

  saveAccount( acct:Account ) : Observable<any> {
    const token = sessionStorage.getItem('token');
    const headerDict = {
      "Access-Control-Allow-Origin" : "*",
      Authorization: `${token}`,
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict)
    };
    return this.httpClient.post( this.url+"save" , acct , requestOptions );
  }


  updateAccount( id:number , acct:Account ) : Observable<any> {
    const token = sessionStorage.getItem('token');
    const headerDict = {
      "Access-Control-Allow-Origin" : "*",
      Authorization: `${token}`,
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict)
    };
    return this.httpClient.put( this.url+"update/"+id , acct, requestOptions);
  }


  deleteAccount( id:number , acct:Account ) : Observable<any> {
    const token = sessionStorage.getItem('token');
    const headerDict = {
      "Access-Control-Allow-Origin" : "*",
      Authorization: `${token}`,
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict)
    };
    return this.httpClient.delete( this.url + "delete/"+id , requestOptions);
  }


  getAccounts(): Observable<any> {
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
  
}
