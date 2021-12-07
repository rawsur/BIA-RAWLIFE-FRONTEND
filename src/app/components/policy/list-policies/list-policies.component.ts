import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { Policy } from 'src/app/models/policies/policy';
import { PolicyService } from 'src/app/services/policies/policy.service';
import { Package } from 'src/app/models/packages/package';
import { PackageService } from 'src/app/services/packages/package.service';
import { ReportPolicyService } from 'src/app/services/reports/report-policy.service';
import { CurrencyService } from 'src/app/services/currency/currency.service';
import { Currency } from 'src/app/models/currency/currency';
import { Customer } from 'src/app/models/customers/customer';
import { AccountService } from 'src/app/services/account/account.service';
import { CustomerService } from 'src/app/services/customers/customer.service';
import { LoginService } from 'src/app/services/login/login.service';
import { User } from 'src/app/models/users/user';

@Component({
  selector: 'app-list-policies',
  templateUrl: './list-policies.component.html',
  styleUrls: ['./list-policies.component.scss']
})
export class ListPoliciesComponent implements OnInit {

  currencies:Currency[];
  policies:Policy[];
  policy:Policy;
  package:Package;
  packages:Package[];
  size:string="small";
  isVisible: boolean;
  isEditable:boolean;
  isdeleted:boolean = false;
  messages: any[] = [];
  subscription: Subscription;
  dateFormat:string="dd/MM/YYYY";
  currentUser:User = new User();

  constructor( private router:Router, private message: NzMessageService , private modal: NzModalService,  private acctService:AccountService , private currService:CurrencyService, private custService:CustomerService , private policyService:PolicyService, private pkgService:PackageService, private reportService:ReportPolicyService, private authService:LoginService ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.CurrentUser ;

    if (  this.currentUser.subscriber ) {
      this.getPackagesBySubscriber(  this.currentUser.subscriber.id );
      this.getPoliciesBySubscriber( this.currentUser.subscriber.id );
    }
    else {
      this.getPackages();
      this.getPolicies();
    }

    this.getCurrencies();
    /* 
    this.getPolicies();
    this.getPackages();
    */
  }

  async getCurrencies() {
    await this.currService.getCurrencies().subscribe(
      reponse => {
        this.currencies = reponse;
      },  error => {
        console.log(error);
      }
    )
  }

  async getPolicies() {
    await this.policyService.getPolicies().subscribe(
      reponse => {
        this.policies = reponse;
      },  error => {
        console.log(error);
      }
    )
  }

  async getPoliciesBySubscriber(subscriber:number) {
    await this.policyService.getPoliciesBySubscriber(subscriber).subscribe(
      reponse => {
        this.policies = reponse;
      },  error => {
        console.log(error);
      }
    )
  }

  getPackages() {
    this.pkgService.getPackages().subscribe(
      reponse => {
        this.packages = reponse;
      },  error => {
        console.log(error);
      }
    )
  }


  getPackagesBySubscriber( subscriber:number ) {
    this.pkgService.getPackageBySubscriber( subscriber ).subscribe(
      reponse => {
        this.packages = reponse;
      },  error => {
        console.log(error);
      }
    )
  }


  async getPolicyById( id:number ) {

    return await this.policyService.getPolicyById(id).subscribe(
      response => {
        this.policy = response;
      }
      
    ) ;

  }

  showDetailPolicy( pol:Policy ): void {
    this.isVisible = true;
    this.policy = pol;
  }

  showEditConfirm(pol:Policy): void {
    this.policy = pol;
    this.isEditable=true;
  }

  handleOk(): void {
    console.log('click ok');
    this.isVisible = false;
    this.isEditable=false;
  }

  handleCancel(){
    this.isVisible=false;
    this.isEditable=false;
  }

  handleOkEdit( pol:Policy ) : void {

    /**
     * Update customer
     */
     pol.user_Update = this.currentUser;
    this.custService.updateCustomer( pol.customer.id , pol.customer ).subscribe(
      response  => {
        
        this.message.success("Client modifié avec succès!");
        pol.customer = response;
        
        /**
         * Update Account
         */
        pol.account.user_update = this.currentUser;
        this.acctService.updateAccount( pol.account.id, pol.account ).subscribe(
          response  => {
            
            this.message.success("Compte modifié avec succès! ");
            pol.account = response;

            /**
             * Update Policy
             */
            this.policyService.updatePolicy( pol.id, pol ).subscribe(
              response  => {
                this.message.success("Police modifiée avec succès!");
                this.isVisible=false;
                this.isEditable=false;
                this.getPolicies();
              }
          );

          },
          error  => {
            this.message.error("Echec modification Compte! " +error.message );
          },
        )

      },
      error  => {
        this.message.error("Echec modification Client! " +error.message );
      },
    );

  }

  showDeleteConfirm(pol:Policy): void {
    this.modal.confirm({
      nzTitle: 'Etes-vous sûr de supprimer cet élément ?',
      nzContent: '<b style="color: red;">' 
                  + pol.customer.fullname+  
                  '</b>'+
                  '<p> Date Naissance :  ' 
                  + pol.customer.dob +  
                  '</p>'+
                  
                  '<p> N° Phone : ' 
                  + pol.customer.phoneNumber+  
                  '</p>'+

                  '<p> Cr&eacute;&eacute; Par : ' 
                  + pol.user.username+  
                  '</p>'+
                  '<p> Cr&eacute;&eacute; Le : ' 
                  + pol.createdAt+  
                  '</p>',

      nzOkText: 'Oui',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deletePolicy(pol),
      nzCancelText: 'Non',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  deletePolicy( poli:Policy) {
    this.policyService.deletePolicy( poli.id , poli ).subscribe(
      response  => {
        console.log("Policy deleted ! " + poli.customer );
        this.message.success("Police supprimé avec succès!");
        this.isdeleted = true;
        this.getPolicies();
      }
    )
  }

  async printFile( id:number ) {
    await this.reportService.generatePdf( 'pdf',id ).subscribe( 
      response  => {
        console.log("Print Response PDF : " +response );
      }
    );
  }

  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.id === o2.id : o1 === o2);


  search(search:string){
    const targetValue: Policy[] = [];
    console.log("Search value : " +search );
    if ( search === null || search=='' ) {
     this.policyService.getPolicies().subscribe(
        reponse => {
          this.policies = reponse;
        },  error => {
          console.log(error);
        }
     );
    }

    this.policies.forEach((value: Policy) => {
      if ( value.customer.fullname.toString().toUpperCase().includes(search.toUpperCase()) ) 
      {
          targetValue.push(value);
      }
    }
   );
   this.policies = targetValue;
 }


}
