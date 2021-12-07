import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscriber } from 'src/app/models/subscribers/subscriber';
import { AppConfigService } from '../app-config.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {

  
  headers:HttpHeaders;

  constructor( private httpClient : HttpClient , private appConfig : AppConfigService ) {}
  
  private url:string= this.appConfig.apiBaseUrl+"api/v1/subscriber/";

  getSubscribers() : Observable<any> {
    const token = sessionStorage.getItem('token');
    this.headers = new HttpHeaders();
    this.headers.append('authentication', `${token}`);
    const headerDict = {
      "Access-Control-Allow-Origin" : "*",
      Authorization: `${token}`,
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict)
    };
    
    return this.httpClient.get(this.url+"list/" , requestOptions);
  }


  getSubscriberByLikeId( id:number ): Observable<any> {
    
    const token = sessionStorage.getItem('token');
    this.headers = new HttpHeaders();
    this.headers.append('authentication', `${token}`);
    const headerDict = {
      "Access-Control-Allow-Origin" : "*",
      Authorization: `${token}`,
    }
    
    const requestOptions = { headers: new HttpHeaders(headerDict)};

    return this.httpClient.get( this.url+"get/subscriber/"+id , requestOptions  );

  }

  getSubscriberById( id:number ): Observable<Subscriber> {
    const token = sessionStorage.getItem('token');
    this.headers = new HttpHeaders();
    this.headers.append('authentication', `${token}`);
    const headerDict = {
      "Access-Control-Allow-Origin" : "*",
      Authorization: `${token}`,
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict)
    };
    return this.httpClient.get<Subscriber>( this.url+"get/"+id , requestOptions  );
  }


  saveSubscriber( subscriber:Subscriber ) : Observable<Subscriber> {
    const token = sessionStorage.getItem('token');
    this.headers = new HttpHeaders();
    this.headers.append('authentication', `${token}`);
    const headerDict = {
      "Access-Control-Allow-Origin" : "*",
      Authorization: `${token}`,
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict)
    };

    return this.httpClient.post<Subscriber>( this.url+"save" , subscriber , requestOptions );
  }


  updateSubscriber( id:number , pkg:Subscriber ) : Observable<Subscriber> {
    const token = sessionStorage.getItem('token');
    this.headers = new HttpHeaders();
    this.headers.append('authentication', `${token}`);
    const headerDict = {
      "Access-Control-Allow-Origin" : "*",
      Authorization: `${token}`,
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict)
    };
    
    return this.httpClient.put<Subscriber>( this.url+"update/"+id , pkg, requestOptions );
  }


  deleteSubscriber( id:number ) : Observable<any> {
    const token = sessionStorage.getItem('token');
    this.headers = new HttpHeaders();
    this.headers.append('authentication', `${token}`);
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
