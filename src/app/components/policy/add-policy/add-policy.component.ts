import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fr_FR, NzI18nService } from 'ng-zorro-antd/i18n';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { Account } from 'src/app/models/account/account';
import { Agency } from 'src/app/models/agency/agency';
import { Currency } from 'src/app/models/currency/currency';
import { Customer } from 'src/app/models/customers/customer';
import { Package } from 'src/app/models/packages/package';
import { Policy } from 'src/app/models/policies/policy';
import { Subscriber } from 'src/app/models/subscribers/subscriber';
import { User } from 'src/app/models/users/user';
import { AccountService } from 'src/app/services/account/account.service';
import { AgencyService } from 'src/app/services/agency/agency.service';
import { CurrencyService } from 'src/app/services/currency/currency.service';
import { CustomerService } from 'src/app/services/customers/customer.service';
import { LoginService} from 'src/app/services/login/login.service';
import { PackageService } from 'src/app/services/packages/package.service';
import { PolicyService } from 'src/app/services/policies/policy.service';
import { SubscriberService } from 'src/app/services/subscribers/subscriber.service';


@Component({
  selector: 'app-add-policy',
  templateUrl: './add-policy.component.html',
  styleUrls: ['./add-policy.component.scss']
})
export class AddPolicyComponent implements OnInit {


  dateFormat = 'dd/MM/yyyy';
  customerForm: FormGroup;
  printCP : boolean=false;
  sessionData:any;

  

  pkgs:Package [];
  subscribers:Subscriber [];
  currencies:Currency [];
  agencies:Agency[];
  pkg:Package;
  cust:Customer;
  returnCust:Customer;
  policy: Policy;
  user:User;

  current = 0;
  index = 'First-content';
  enableNext = false;

  header="Description Police";
  
  messages: any[] = [];
  subscription: Subscription;
  account: Account;
  currentUser: User = new User();

  constructor( private message: NzMessageService ,   private fb: FormBuilder ,private router : Router , private i18n: NzI18nService , private authService:LoginService , private acctService:AccountService , private agencyService:AgencyService , private currService:CurrencyService , private custService:CustomerService , private pkgService : PackageService  , private subscrService:SubscriberService , private policyService:PolicyService ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.CurrentUser;
    this.sessionData = sessionStorage.getItem('username');
    this.switchLanguage();
    this.initForms();

    if ( this.currentUser.subscriber ) {

      this.getAgenciesBySubscriber( this.currentUser.subscriber.id );
      this.getCurrencies();
      this.getPackagesBySubscriber(this.currentUser.subscriber.id);
      this.getSubscribersLike( this.currentUser.subscriber.id );

    }else {
      this.getAgencies();
      this.getCurrencies();
      this.getPackages();
      this.getSubscribers();
    }

    /* 
    this.getAgencies();
    this.getCurrencies();
    this.getPackages();
    this.getSubscribers(); 
    */

  }

  async getAgencies() {
    await this.agencyService.getAgencies().subscribe(
      response => {
        this.agencies = response;
      },  error => {
        console.log(error);
      })
  }

  async getAgenciesBySubscriber(subscriber:number) {
    await this.agencyService.getAgencyBySubscriber(subscriber).subscribe(
      response => {
        this.agencies = response;
      },  error => {
        console.log(error);
      })
  }

  async getCurrencies () {
    await this.currService.getCurrencies().subscribe(
      response => {
        this.currencies = response;
      },  error => {
        console.log(error);
      })
  }

  async getPackages () {
    await this.pkgService.getPackages().subscribe(
      response => {
        this.pkgs = response;
      },  error => {
        console.log(error);
      })
  }

  async getPackagesBySubscriber ( subscriber:number ) {
    await this.pkgService.getPackageBySubscriber(subscriber).subscribe(
      response => {
        this.pkgs = response;
      },  error => {
        console.log(error);
      })
  }

  async getSubscribers () {
    await this.subscrService.getSubscribers().subscribe(
      response => {
        this.subscribers = response;
      },  error => {
        console.log(error);
      })
  }


  async getSubscribersLike (subscriber:number) {
    await this.subscrService.getSubscriberByLikeId(subscriber).subscribe(
      response => {
        console.log("Subscriber : " +JSON.stringify( response ) )
        this.subscribers = response;
      },  error => {
        console.log(error);
      })
  }



  
  switchLanguage() {
    this.i18n.setLocale(fr_FR);
  }


  initForms() {
    this.customerForm = this.fb.group({
      agency:['', Validators.required],
      accountNumber:['', Validators.required],
      accountCurrency:['', Validators.required],
      fullname: ['', Validators.required],
      sex: ['', Validators.required],
      dob: ['', Validators.required ],
      poBirth: ['', Validators.nullValidator],
      address: ['', Validators.required],
      phoneNumber: [''],
      subscrib:['', [ Validators.required ]],
      pkg: ['', [ Validators.required ]],
      effect_date:['', [ Validators.required]],
      user:['', [ Validators.required]],

    });
  }


  checkValidCustomer() {

    if ( !this.customerForm.valid ) {

      alert("Merci de vérifier tous les champs du formulaire");

    } else {
      this.printCP=true;
    }

  }



  /**
   * Save Loan and Customer
   */
   async SaveCustomer() {
    
    /**
     * Get Customer Informations
     */
    this.cust = new Customer();
    this.cust.agency        = this.customerForm.controls['agency'].value;
    this.cust.address       = this.customerForm.controls['address'].value;
    this.cust.dob           = this.customerForm.controls['dob'].value;
    this.cust.fullname      = this.customerForm.controls['fullname'].value;
    this.cust.phoneNumber   = this.customerForm.controls['phoneNumber'].value;
    this.cust.poBirth       = this.customerForm.controls['poBirth'].value;
    this.cust.sex           = this.customerForm.controls['sex'].value;
    this.cust.subscriber    = this.customerForm.controls['subscrib'].value;
    /** Get current User */
    let uname:string        = this.customerForm.controls['user'].value;
    this.cust.user          = this.currentUser;
    this.cust.user_Updated  = this.currentUser;

    console.log("Current User in save : " + this.currentUser );

    this.returnCust = new Customer();

    /**
    * Save Customer 
    */
    await this.custService.saveCustomer( this.cust ).subscribe(
      (response) => {
        
        this.returnCust = response;

        this.message.success( "Client" +this.returnCust.fullname+ " Enregistrée avec succès!" );

        /**
         * Get Account Informations
         * 
         */
         this.account = new Account();
         this.account.accountNumber = this.customerForm.controls['accountNumber'].value;
         this.account.currency = this.customerForm.controls['accountCurrency'].value;
         this.account.customer = this.returnCust;
         this.account.user = this.returnCust.user;
         this.account.user_update = this.returnCust.user;

        /**
        * Save Account
        */
         let acct:Account = new Account() ;
         this.acctService.saveAccount( this.account ).subscribe(
          (response) => {
            
            acct=response;
            this.message.success("Compte créé avec succès!");
            console.log( "Save Account acct " + acct );
            console.log( "Save Account this : " + acct.id );

            /**
            * Get Policy Informations
            */
            this.policy = new Policy();
            this.policy.account = acct;
            this.policy.customer = this.returnCust;
            this.policy.effect_date = this.customerForm.controls['effect_date'].value;
            this.policy.expiringDate = this.customerForm.controls['effect_date'].value;
            this.policy.pkge = this.customerForm.controls['pkg'].value;
            let newref:string;
            newref = this.returnCust.agency.codeAgence + this.policy.pkge.name.substring(1,3).toUpperCase();
            this.policy.ref = newref;
            this.policy.subscriber = this.customerForm.controls['subscrib'].value;
            this.policy.typeofGarantie= "Décès et PTIA";
            this.policy.user = response.user;
            this.policy.user_Update = response.user;

            /**
             * Save Policy 
             */
            this.policyService.savePolicy( this.policy ).subscribe(
              response=> {
                this.message.success( "Police du client " + this.policy.customer.fullname + " Enregistrée avec succès!" );
                this.router.navigate(['/policy/list-policy'] );

              }, error=> { 
                this.message.error("Echec enregistrement Police. " + error.message);
                console.log(error); 
              }
            );
          }
          ,error=> { 
            this.message.error("Echec enregistrement Compte. " + error.message);
            console.log(error); 
          }
         );

      }, error=> {
        this.message.error("Echec enregistrement Client. " + error.message);
      }
    );

  }


  /**
   * 
   * @param cust 
   * 
   * Save Policy With Customer
   */
  async SavePolicy( cust:Customer ) {

    // Create Policy
    this.pkg.id = this.customerForm.controls['pkg'].value;
    this.policy.customer = cust;
    this.policy.effect_date = this.customerForm.controls['effect_date'].value;
    this.policy.expiringDate = this.customerForm.controls['effect_date'].value;
    this.policy.pkge = this.customerForm.controls['pkge'].value;
    this.policy.typeofGarantie="Garantie Décès et PTIA";

    
    this.policy.user = this.user;

    await this.policyService.savePolicy( this.policy ).subscribe( 
      data=> {
        console.log("Policy Saved successfully!");
        this.message.success("Police créée avec succès");
      }, error=> { console.log(error); }
    );

  }



}
