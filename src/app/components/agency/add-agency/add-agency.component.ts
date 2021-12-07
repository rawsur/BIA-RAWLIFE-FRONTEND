import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Agency } from 'src/app/models/agency/agency';
import { Subscriber } from 'src/app/models/subscribers/subscriber';
import { User } from 'src/app/models/users/user';
import { AgencyService } from 'src/app/services/agency/agency.service';
import { LoginService } from 'src/app/services/login/login.service';
import { SubscriberService } from 'src/app/services/subscribers/subscriber.service';

@Component({
  selector: 'app-add-agency',
  templateUrl: './add-agency.component.html',
  styleUrls: ['./add-agency.component.scss']
})
export class AddAgencyComponent implements OnInit {

  header="Informations Agence";
  dateFormat = 'dd/MM/yyyy';
  agencyForm: FormGroup;
  agency:Agency;
  sessionData:any;
  agencies:Agency [];
  subscribers:Subscriber [];
  currentUser:User;

  current = 0;
  
  constructor( private fb: FormBuilder, private route:Router , private message:NzMessageService, private agencyService:AgencyService , private subscriberService:SubscriberService, private userService:LoginService , private titleService:Title, private authService:LoginService ) { }

  ngOnInit(): void {
    this.sessionData = sessionStorage.getItem('username');
    this.currentUser = this.authService.CurrentUser;
    this.titleService.setTitle("BIA -- Création Agence");
    this.initForms();

    if ( this.currentUser.subscriber ) {
      this.getSubscriberById( this.currentUser.subscriber.id );
    } else {
      this.getSubscribers();
    }

    
  }

  initForms() {
    this.agencyForm = this.fb.group({
      name: ['', Validators.required],
      codeAgence: ['', [Validators.required, Validators.minLength(1) , Validators.maxLength(5)]],
      subscriber:['', Validators.required],
      user:['', [ Validators.required]],
    });
  }

  getSubscribers() {
    this.subscriberService.getSubscribers().subscribe(
      response =>{
        this.subscribers = response;
      },
      error => { this.message.error("Erreur " +error.message ) }
    );
  }

  getSubscriberById( subscriber:number ) {
    this.subscriberService.getSubscribers().subscribe(
      response =>{
        this.subscribers = response;
      },
      error => { this.message.error("Erreur " +error.message ) }
    );
  }

  async SaveAgency() {
    this.agency = new Agency();
    this.agency.codeAgence = this.agencyForm.controls['codeAgence'].value;
    this.agency.name = this.agencyForm.controls['name'].value;
    this.agency.subscriber = this.agencyForm.controls['subscriber'].value;
    let uname:string = this.agencyForm.controls['user'].value;

    this.agency.user = this.currentUser;
    this.agency.user_Updated = this.currentUser;

    await this.agencyService.saveAgency(this.agency ).subscribe( 
      response=> {
        this.message.success("Agence créée avec succès!");
        this.route.navigate(['/agency/list-agency']);
      }, error=> { this.message.error( " Erreur Cr&eacute;tion Agence. " + error.message); }
    );

  }

}
