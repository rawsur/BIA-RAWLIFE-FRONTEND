import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Currency } from 'src/app/models/currency/currency';
import { AppConfigService } from '../app-config.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  

  constructor( private httpClient : HttpClient , private appConfig:AppConfigService ) {}

  private url:string = this.appConfig.apiBaseUrl+"api/v1/currency/";

  saveCurrency( currency:Currency ) : Observable<any> {
    const token = sessionStorage.getItem('token');
    const headerDict = {
      "Access-Control-Allow-Origin" : "*",
      Authorization: `${token}`,
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict)
    };
    return this.httpClient.post( this.url+"save" , currency , requestOptions );
  }


  updateCurrency( id:number , currency:Currency ) : Observable<any> {
    const token = sessionStorage.getItem('token');
    const headerDict = {
      "Access-Control-Allow-Origin" : "*",
      Authorization: `${token}`,
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict)
    };
  //return this.httpClient.put( this.url+"update/"+id , pol, requestOptions);
    return this.httpClient.put( this.url+"update/"+id , currency, requestOptions);
  }


  deleteCurrency( id:number , currency:any ) : Observable<any> {
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


  getCurrencies(): Observable<any> {
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


  getCurrencyById( id:number ) : Observable<any>  {
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


  getCurrencyByCodIso( isocode:string ) : Observable<any>  {
    const token = sessionStorage.getItem('token');
    const headerDict = {
      "Access-Control-Allow-Origin" : "*",
      Authorization: `${token}`,
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict)
    };
    return this.httpClient.get( this.url+"get/code/"+isocode, requestOptions );
  }

  
}
