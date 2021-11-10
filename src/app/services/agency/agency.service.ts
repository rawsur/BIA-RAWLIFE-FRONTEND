import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Agency } from 'src/app/models/agency/agency';
import { Subscriber } from 'src/app/models/subscribers/subscriber';
import { AppConfigService } from '../app-config.service';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  constructor( private httpClient:HttpClient , private appConfig:AppConfigService ) {}

  private url:string ;

  saveAgency( agency:Agency ) : Observable<any> {
    this.url = this.appConfig.apiBaseUrl+"api/v1/agency/";
    const token = sessionStorage.getItem('token');
    const headerDict = {
      "Access-Control-Allow-Origin" : "*",
      Authorization: `${token}`,
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict)
    };
    return this.httpClient.post( this.url+"save" , agency , requestOptions );
  }


  updateAgency( id:number , agency:Agency ) : Observable<any> {
    this.url = this.appConfig.apiBaseUrl+"api/v1/agency/";
    const token = sessionStorage.getItem('token');
    const headerDict = {
      "Access-Control-Allow-Origin" : "*",
      Authorization: `${token}`,
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict)
    };

    return this.httpClient.put( this.url+"update/"+id , agency, requestOptions);
  }


  deleteAgency( id:number , agency:Agency ) : Observable<any> {
    this.url = this.appConfig.apiBaseUrl+"api/v1/agency/";
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


  getAgencies(): Observable<any> {
    this.url = this.appConfig.apiBaseUrl+"api/v1/agency/";
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


  getAgencyById( id:number ) : Observable<any>  {
    this.url = this.appConfig.apiBaseUrl+"api/v1/agency/";
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

  getAgencyBySubscriber( subscr:Subscriber ) : Observable<Agency[]> {
    this.url = this.appConfig.apiBaseUrl+"api/v1/agency/";
    const token = sessionStorage.getItem('token');
    
    let httpHeaders = new HttpHeaders()
    httpHeaders.set("Access-Control-Allow-Origin" , "*");
    httpHeaders.set( "Authorization" , `${token}` );

    let httpParams = new HttpParams()
    httpParams.set('subscriber', subscr.name);
    
    return this.httpClient.get<Agency[]>( this.url+"get/name", { headers: httpHeaders,
      params: httpParams, 
      responseType: 'json'} );

  }

  

}
