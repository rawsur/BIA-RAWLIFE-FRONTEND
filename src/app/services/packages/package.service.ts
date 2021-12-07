import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from '../app-config.service';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  
  headers:HttpHeaders;

  constructor( private httpClient : HttpClient , private appConfig : AppConfigService ){}

  private url:string = this.appConfig.apiBaseUrl+"api/v1/package/";

  getPackages() : Observable<any>  {
    
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


  getPackageById( id:number ) {
    return this.httpClient.get( this.url+"get/"+id  );
  }

  getPackageBySubscriber ( id:number ) : Observable<any>  {
    return this.httpClient.get( this.url+"get/subscriber/"+id  );
  }


  savePackage( pkg:any ) : Observable<any> {
    return this.httpClient.post( this.url+"save" , pkg );
  }


  updatePackage( id:number , pkg:any ) : Observable<any> {
    return this.httpClient.put( this.url+"update/"+id , pkg );
  }


  deletePackage( id:number , pkg:any ) : Observable<any> {
    return this.httpClient.delete( this.url + "delete/"+id , pkg);
  }


}
