import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subscriber } from 'src/app/models/subscribers/subscriber';
import { User } from 'src/app/models/users/user';
import { LoginService } from 'src/app/services/login/login.service';
import { SubscriberService } from 'src/app/services/subscribers/subscriber.service';

@Component({
  selector: 'app-list-subscriber',
  templateUrl: './list-subscriber.component.html',
  styleUrls: ['./list-subscriber.component.scss']
})
export class ListSubscriberComponent implements OnInit {

  subscribers: Subscriber[];
  subscr:Subscriber;
  isVisible:boolean=false;
  isEditable:boolean=false;
  dateFormat:string="dd/MM/YYYY";
  currentUser:User = new User();

  constructor( private message:NzMessageService , private modal: NzModalService , private subscriberService:SubscriberService , private authService:LoginService ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.CurrentUser;
    this.getSubscribers();
  }

  async getSubscribers() {
    await this.subscriberService.getSubscribers().subscribe(
      response => {
        this.subscribers = response;
      },  error => {
        console.log(error);
      }
    )
  }

  showSubscriber(subscribe:Subscriber) {
    this.isVisible = true;
    this.subscr = subscribe;
  }

  editSubscriber(subscribe:Subscriber) {
    this.subscr = subscribe;
    this.isEditable = true;
  }

  async showDeleteConfirm(subscri:Subscriber) {
    await this.modal.confirm({
      nzTitle: 'Etes-vous sûr de supprimer cet élément ?',
      nzContent: '<b style="color: red;">' 
                  + subscri.name+  
                  '</b>'+
                  
                  '<p> N° Phone : ' 
                  + subscri.phoneNumber+  
                  '</p>'+

                  '<p> Cr&eacute;&eacute; Par : ' 
                  + subscri.user.username+  
                  '</p>'+
                  '<p> Cr&eacute;&eacute; Le : ' 
                  + subscri.createdAt+  
                  '</p>',

      nzOkText: 'Oui',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteSubscriberById(subscri.id),
      nzCancelText: 'Non',
      nzOnCancel: () => console.log('Cancel')
    });
  }


  async deleteSubscriberById( id:number ) {
    return await this.subscriberService.deleteSubscriber(id).subscribe(
      response => {
        console.log("Delete Subscriber Response ");
        this.message.error(`Souscripteur supprimé!`);
        this.getSubscribers();
      });
  }

  handleOk(): void {
    console.log('click ok');
    this.isVisible = false;
  }

  handleOkEditSubscriber( sub:Subscriber  ) {
    this.subscriberService.updateSubscriber( sub.id , sub ).subscribe(
      response  => {
        this.message.warning("Souscripteur modifiée avec succès!");
        this.isVisible=false;
        this.isEditable=false;
        this.getSubscribers();
      }
  );
  }

  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.id === o2.id : o1 === o2);

}
