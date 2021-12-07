import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from '../app-config.service';

@Injectable({
  providedIn: 'root'
})
export class ReportInsuranceService {

  private fileURL!:string;
  constructor( private httpClient : HttpClient , private appConfig : AppConfigService ){}

  private url:string = this.appConfig.apiasvUrl+"api/v1/report/travel/";
  private downloadURL:string = this.url+"/export/file?fileName=";

  generatePdf( format:string, policy:string, id:number, tacite:string ){
    const token = sessionStorage.getItem('token');
    const headerDict = {
      "Access-Control-Allow-Origin" : "*",
      Authorization: `${token}`,
      
    }    
    const requestOptions = new HttpHeaders(headerDict);

    this.httpClient.get<any>( this.url + `export/${format}/risk/${policy}/${id}/${tacite}`, { headers:requestOptions , responseType:'text' as 'json' } ).subscribe(
      response=> {
        this.fileURL=response.replace( /\\/g, '/' );
        console.log(`Download URL : ${this.fileURL}`);
        this.downloadPdf( this.fileURL );
      }
    );

    return this.httpClient.get<any>(this.fileURL, {responseType: 'text' as 'json'} );
  }

  downloadPdf( file:string ) {
    const httpOptions={
      responseType:'blob' as 'json'
    }
    let link:string;
    
    link=this.downloadURL+file;
    window.open( link );
    return this.httpClient.get<any>( link , httpOptions  );

  }
  
}
