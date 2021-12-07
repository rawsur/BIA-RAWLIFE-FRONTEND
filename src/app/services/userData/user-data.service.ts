import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Package } from 'src/app/models/packages/package';
import { Subscriber } from 'src/app/models/subscribers/subscriber';
import { AppConfigService } from '../app-config.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  url:string;

  constructor( private http: HttpClient , private appConfig:AppConfigService ) { }

  /**
   * 
   * @returns User Data Details
   */
  getUserData() : Observable<any> {
    this.url = this.appConfig.apiBaseUrl;
    
    const token = sessionStorage.getItem('token');
    const headerDict = {
      "Access-Control-Allow-Origin" : "*",
      Authorization: `${token}`,
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict)
    };

    return this.http.get( this.url ,requestOptions );

  }


  /**
   * 
   * @param idUser User ID
   * @returns Returns Actions by User
   * 
   */
  getUserActions(idUser:number) {
    this.url+="api/v1/action/";

    const token = sessionStorage.getItem('token');
    const headerDict = {
      "Access-Control-Allow-Origin" : "*",
      Authorization: `${token}`,
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict)
    };
    
    return this.http.get( this.url+"get/"+idUser, requestOptions  );
  }


  /**
   * 
   * @param id User Agency ID
   * @returns User Agency
   */
  getUserAgency( id:number ) {
    this.url+="api/v1/agency/";

    const token = sessionStorage.getItem('token');
    const headerDict = {
      "Access-Control-Allow-Origin" : "*",
      Authorization: `${token}`,
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict)
    };
    
    return this.http.get( this.url+"get/"+id, requestOptions  );
  }

  /**
   * 
   * @param idSubscriber Subscriber Identification
   * @returns Get Package by Subscriber
   */
  getPackageBySubscriber( idSubscriber:number ) {

    this.url+="api/v1/package/";

    const token = sessionStorage.getItem('token');
    const headerDict = {
      "Access-Control-Allow-Origin" : "*",
      Authorization: `${token}`,
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict)
    };

    return this.http.get<Package[]>( this.url+"get/subscriber/"+idSubscriber , requestOptions );
  }


}
