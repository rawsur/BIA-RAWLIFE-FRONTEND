import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Agency } from 'src/app/models/agency/agency';
import { Subscriber } from 'src/app/models/subscribers/subscriber';
import { User } from 'src/app/models/users/user';
import { AgencyService } from 'src/app/services/agency/agency.service';
import { LoginService } from 'src/app/services/login/login.service';
import { SubscriberService } from 'src/app/services/subscribers/subscriber.service';

@Component({
  selector: 'app-list-agency',
  templateUrl: './list-agency.component.html',
  styleUrls: ['./list-agency.component.scss']
})
export class ListAgencyComponent implements OnInit {

  sessionData:any;
  agencies:Agency[];
  subscribers:Subscriber[];
  agency: Agency;
  isVisible: boolean;
  isEditable: boolean;
  dateFormat:string="dd/MM/YYYY";
  currentUser: User = new User();

  constructor( private message:NzMessageService, private modal: NzModalService , private agencyService:AgencyService , private subscriberService:SubscriberService , private userService:LoginService, private authService:LoginService ) { }

  ngOnInit(): void {
    this.sessionData = sessionStorage.getItem('username');
    this.currentUser = this.authService.CurrentUser;
    if( this.currentUser.subscriber ) {
      
      this.getAgenciesBySubscriber( this.currentUser.subscriber.id );
      this.getSubscribers();
    }else {
      this.getAgencies();
      this.getSubscribers();
    }
    
  }

  getAgencies() {
    this.agencyService.getAgencies().subscribe(
      response =>{
        this.agencies = response;
      },
      error => { this.message.error("Erreur " +error.message ) }
    )
  }

  getAgenciesBySubscriber( subscriber:number ) {
    this.agencyService.getAgencies().subscribe(
      response =>{
        this.agencies = response;
      },
      error => { this.message.error("Erreur " +error.message ) }
    )
  }

  getSubscribers() {
    this.subscriberService.getSubscribers().subscribe(
      response =>{
        this.subscribers = response;
      },
      error => { this.message.error("Erreur " +error.message ) }
    );
  }

  getSubscriberuById( subscriber:number ) {
    this.subscriberService.getSubscribers().subscribe(
      response =>{
        this.subscribers = response;
      },
      error => { this.message.error("Erreur " +error.message ) }
    );
  }

  handleOk() {
    this.isVisible=false;
    this.isEditable=false;
  }

  handleCancel(){
    this.isVisible=false;
    this.isEditable=false;
  }

  showAgency( agency:Agency ): void {
    this.isVisible = true;
    this.agency = agency;
  }



  editAgency(age:Agency) : void {
    this.isEditable=true;
    this.agency = age;
  }


  async handleOkEditAgency( agency:Agency ) {
    
    let uname:string = this.sessionData;
    
    agency.user_Updated  = this.currentUser;

        this.agencyService.updateAgency( agency.id , agency ).subscribe(
            response  => {
              this.message.success("Agence modifiée avec succès!");
              this.isVisible=false;
              this.isEditable=false;
              this.getAgencies();
            }, error  => { 
              this.message.error("Error : " +error.error.message );
            }
        );
    
  }


  showDeleteConfirm(agency:Agency): void {
    this.modal.confirm({
      nzTitle: 'Etes-vous sûr de supprimer cet élément ?',
      nzContent: '<b style="color: red;"> Agence : </b>' 
                  + agency.name+  
                  ''+
                  '<p> <b>Souscripteur : </b> ' 
                  + agency.subscriber.name +  
                  '</p>'+
                  '<p> <b>Cr&eacute;&eacute; Le : </b> ' 
                  + agency.createdAt + 
                  '</p>',

      nzOkText: 'Oui',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteAgency(agency),
      nzCancelText: 'Non',
      nzOnCancel: () => console.log('Cancel')
    });
  }


  deleteAgency( agenc:Agency) {
    this.agencyService.deleteAgency( agenc.id , agenc ).subscribe(
      response  => {
        this.message.error("Agence supprimée avec succès!");
        this.getAgencies();
      }
    )
  }

  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.id === o2.id : o1 === o2);

}
