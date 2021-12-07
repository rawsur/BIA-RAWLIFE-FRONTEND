import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Insurance } from 'src/app/models/assurance-voyage/insurance';
import { AppConfigService } from 'src/app/services/app-config.service';
import { InsurancesService } from 'src/app/services/assurance-voyage/insurances.service';
import { ReportInsuranceService } from 'src/app/services/assurance-voyage/report-insurance.service';

@Component({
  selector: 'app-show-insurance',
  templateUrl: './show-insurance.component.html',
  styleUrls: ['./show-insurance.component.scss']
})
export class ShowInsuranceComponent implements OnInit {

  constructor( private appConfig:AppConfigService , private titleService:Title, private insuranceService:InsurancesService , private message: NzMessageService , private reportService:ReportInsuranceService ) { }

  insurances!:Insurance[];

  total = 0;
  loading:boolean = false;
  pageIndex = 1;
  pageSize = 10;
  
  ngOnInit(): void {
    this.titleService.setTitle( this.appConfig.apiAsvAppName+" - Gestion Impression Assurance Voyage");
  }


  printFile( policy:string, coderisq:string) 
  {  
      this.reportService.generatePdf( 'pdf', policy, Number(coderisq) , 'false' ).subscribe( 
        response  => {
          console.log( "Print Response PDF : " +response );
          this.message.success( " Attestation Imprimé avec succès ");
        }, error  => {
          this.message.error( "Echec Impression Attestation :" + error.message );
          this.message.error( "Echec Impression Attestation :" + error.error.message );
          this.message.error( "Echec Impression Attestation :" + error );
        }
      );
  }


  search(search:string)
  {
    this.loading=true;
    if ( search === null || search=='' ) 
    {
        this.total=0;
        this.message.warning("Recherche valeur nulle non autorisée");
        this.loading=false;

    } else 
    {
        this.insuranceService.getInsuranceByCle( search.toUpperCase() ).subscribe(
          reponse => {
            this.insurances = reponse;
            this.total = this.insurances.length;
            this.loading=false;
          },  error => {
            console.log(error);
          }
        );

    }
 }

}
