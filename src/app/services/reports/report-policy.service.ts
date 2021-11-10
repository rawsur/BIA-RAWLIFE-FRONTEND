import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from '../app-config.service';

@Injectable({
  providedIn: 'root'
})
export class ReportPolicyService {

  private fileURL:string;
  constructor( private httpClient : HttpClient , private appConfig : AppConfigService ){}

  private url:string = this.appConfig.apiBaseUrl+"api/v1/report/policy/";
  private downloadURL:string = this.appConfig.apiBaseUrl+"api/v1/report/policy/export/file?fileName=";

  generatePdf( format:string, id:number ){
    const token = sessionStorage.getItem('token');
    const headerDict = {
      "Access-Control-Allow-Origin" : "*",
      Authorization: `${token}`,
      
    }    
    const requestOptions = new HttpHeaders(headerDict);

    this.httpClient.get<any>( this.url + `export/${format}/${id}`, { headers:requestOptions , responseType:'text' as 'json' } ).subscribe(
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
    console.log( "Inside downloadPdf() ");
    console.log( "File URL " + link );

    return this.httpClient.get<any>( link , httpOptions  );

  }
  
}
