import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Agency } from 'src/app/models/agency/agency';
import { Subscriber } from 'src/app/models/subscribers/subscriber';
import { User } from 'src/app/models/users/user';
import { AgencyService } from 'src/app/services/agency/agency.service';
import { AppConfigService } from 'src/app/services/app-config.service';
import { LoginService } from 'src/app/services/login/login.service';
import { SubscriberService } from 'src/app/services/subscribers/subscriber.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  subscribers:Subscriber[];
  agencies:Agency[];

  userForm:FormGroup;
  sessionData:any;
  header:string="Informations Utilisateur";
  currentUser:User = new User();
  
  constructor( private router: Router , private appConfig:AppConfigService, private fb:FormBuilder ,private titleService:Title , private agencyService:AgencyService , private message:NzMessageService , private subscrService:SubscriberService , private authService:LoginService ) { }

  ngOnInit(): void {
    
    this.sessionData = sessionStorage.getItem('username');
    this.currentUser = this.authService.CurrentUser;
    this.titleService.setTitle( this.appConfig.appName+ " - Création Utilisateur " );
    this.initForms();

    this.getAgencies();
    this.getSubscribers();
  }

  initForms() {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      fullname: ['', Validators.required],
      role:['', [ Validators.required ]],
      subscriber:['', [ Validators.required ]],
      agency:['', [ Validators.required ]],
      user:['', [ Validators.required]],
    });
  }

  SaveUser() {
    let user:User = new User();
    user.username = this.userForm.controls['username'].value;
    user.password = this.userForm.controls['username'].value;
    user.subscriber = this.userForm.controls['subscriber'].value;
    

    user.role = this.userForm.controls['role'].value;
    user.agency=this.userForm.controls['agency'].value;

    this.authService.saveUser(user).subscribe(
      response => {
        this.message.success( "Enregistrement utilisateur " + response.username + " effectué " );
        this.router.navigate(['/user/list-user'] );
      },  error => {
        this.message.error( "Echec Enregistrement utilisateur" + user.username + ". Raisons : " + error.message );
        this.message.error( "Error : " + error.error );
      }
    );

  }

  async getAgencies() {
    await this.agencyService.getAgencies().subscribe(
      response => {
        this.agencies = response;
      },  error => {
        this.message.error( "Error : " + error.error );

      }
    )
  }

  async getSubscribers() {
    await this.subscrService.getSubscribers().subscribe(
      response => {
        this.subscribers = response;
      },  error => {
        this.message.error( "Error : " + error.error );
      }
    )
  }

}
