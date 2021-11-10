import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Agency } from 'src/app/models/agency/agency';
import { Subscriber } from 'src/app/models/subscribers/subscriber';
import { User } from 'src/app/models/users/user';
import { AgencyService } from 'src/app/services/agency/agency.service';
import { AppConfigService } from 'src/app/services/app-config.service';
import { LoginService } from 'src/app/services/login/login.service';
import { SubscriberService } from 'src/app/services/subscribers/subscriber.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  users:User[];
  user:User;
  subscribers:Subscriber[];
  agencies:Agency[];
  isVisible:boolean;
  isEditable:boolean;

  constructor( private appConfig:AppConfigService , private message:NzMessageService, private modalService:NzModalService , private titleService:Title, private agencyService:AgencyService , private loginService:LoginService , private subscriberService:SubscriberService ) { }

  ngOnInit(): void {
    this.titleService.setTitle( this.appConfig.appName+ " - Liste Utilisateurs " );
    this.getAgencies();
    this.getSubscribers();
    this.getUsers();
  }

  getAgencies() {
    this.agencyService.getAgencies().subscribe(
      response => {
        this.agencies = response;
      },  error => {
        this.message.error("Impossible de récupérer les données Agences. ");
        this.message.error( "Erreur : " + error.error.message );
      }
    );
  }

  getSubscribers(){
    this.subscriberService.getSubscribers().subscribe(
      response => {
        this.subscribers = response;
      },  error => {
        this.message.error("Impossible de récupérer les données Partenaires. ");
        this.message.error( "Erreur : " + error.error.message );
      }
    );
  }

  async getUsers() {
    await this.loginService.getUsers().subscribe(
      response => {
        this.users = response;
      },  error => {
        this.message.error("Impossible de récupérer les données utilisateurs. ");
        this.message.error( "Erreur : " + error.error.message );
      }
    );
  }


  handleCancel(){
    this.isVisible=false;
    this.isEditable=false;
  }

  handleOk(){
    this.isVisible=false;
    this.isEditable=false;
  }

  handleEdit( user:User ) {
    
  }

  handleReset(usr:User){

    this.loginService.updateUserPwd( usr ).subscribe(
      response => {
        this.message.success( "Mot de passe utilisateur " + response.username + " réinitialisé. " );
      },  error => {
        this.message.error( "Echec Reset mot de passe utilisateur" + usr.username + ". Raisons : " + error.message );
        this.message.error( "Error : " + error.error.message );
      }
    );

  }


  showUser( usr:User ): void {
    this.isVisible = true;
    this.user = usr;
  }


  editUser( usr:User ): void {
    this.isEditable = true;
    this.user = usr;
  }




  showReset(usr:User) {
    this.modalService.confirm({
      nzTitle: '<i>Reset Mot de passe</i>',
      nzContent: 'Voulez-vous réinitialiser le mot de passe de l\'utilisateur '+ usr.username,
      nzOnOk: ()=> this.handleReset(usr),
      nzOkText: 'OUI',
      nzCancelText:'NON'
    });
  }



  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.id === o2.id : o1 === o2);


}
