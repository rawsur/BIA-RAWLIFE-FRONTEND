import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from '../app-config.service';

@Injectable({
  providedIn: 'root'
})
export class InsurancesService {

  constructor( private httpClient : HttpClient , private appConfig : AppConfigService ) { }

  private url:string= this.appConfig.apiasvUrl+"api/v1/travel/";

  getAllInsurances() : Observable<any> {
    return this.httpClient.get(this.url+"get/all/");
  }

  getInsuranceByCard( cardNumber:string ) : Observable<any> {
    return this.httpClient.get(this.url+"get/card/"+cardNumber);
  }

  getInsuranceByNameLike( name:string ) : Observable<any> {
    return this.httpClient.get(this.url+"get/name/"+name);
  }

  getInsuranceByRisk( risk:string ) : Observable<any> {
    return this.httpClient.get(this.url+"get/risk/"+risk);
  }

  getInsuranceByCle( cle:string ) : Observable<any> {
    return this.httpClient.get(this.url+"get/key/"+cle+"/");
  }

}
