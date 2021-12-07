import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Policy } from 'src/app/models/policies/policy';
import { AppConfigService } from '../app-config.service';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  

  constructor( private httpClient : HttpClient , private appConfig : AppConfigService ){}
  
  private url:string= this.appConfig.apiBaseUrl+"api/v1/policy/";

  savePolicy( pol:any ) : Observable<any> {
    const token = sessionStorage.getItem('token');
    const headerDict = {
      "Access-Control-Allow-Origin" : "*",
      Authorization: `${token}`,
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict)
    };

    console.log("URL Before send : " +this.url );
    console.log("URL Header Before send : " +requestOptions );
    
    return this.httpClient.post( this.url+"save" , pol , requestOptions );

  }

  getPolicies() : Observable<any> {
    return this.httpClient.get(this.url+"list");
  }

  getPoliciesBySubscriber( subscriber:number ) : Observable<any> {
    return this.httpClient.get(this.url+"get/subscriber/"+subscriber);
  }


  getPoliciesBySubscriberAndAgency( subscriber:number, agency:number ) : Observable<any> {
    return this.httpClient.get(this.url+"get/subscriber/"+subscriber+"/"+agency);
  }


  getPolicyById( id:number ) : Observable<Policy> {
    const token = sessionStorage.getItem('token');
    const headerDict = {
      "Access-Control-Allow-Origin" : "*",
      Authorization: `${token}`,
    }    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict)
    };
    
    return this.httpClient.get<Policy>( this.url+"get/"+id , requestOptions );
  }


  

  updatePolicy( id:number , pol:any ) : Observable<any> {
    const token = sessionStorage.getItem('token');
    const headerDict = {
      "Access-Control-Allow-Origin" : "*",
      Authorization: `${token}`,
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict)
    };

    return this.httpClient.put( this.url+"update/"+id , pol, requestOptions);
  }


  deletePolicy( id:number , pol:any ) : Observable<any> {
    const token = sessionStorage.getItem('token');
    const headerDict = {
      "Access-Control-Allow-Origin" : "*",
      Authorization: `${token}`,
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict)
    };

    return this.httpClient.delete( this.url + "delete/"+id , requestOptions );
  }

}
