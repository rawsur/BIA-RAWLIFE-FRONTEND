import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscriber } from 'src/app/models/subscribers/subscriber';
import { User } from 'src/app/models/users/user';
import { LoginService } from 'src/app/services/login/login.service';
import { SubscriberService } from 'src/app/services/subscribers/subscriber.service';

@Component({
  selector: 'app-add-subscriber',
  templateUrl: './add-subscriber.component.html',
  styleUrls: ['./add-subscriber.component.scss']
})
export class AddSubscriberComponent implements OnInit {

  subscriber:Subscriber = new Subscriber();
  subscriberForm:FormGroup;
  header:string="Informations Souscripteur";
  dateFormat:string="dd/MM/YYYY";
  sessionData:any;
  currentUser:User = new User();

  
  constructor( private fb:FormBuilder , private router:Router, private message: NzMessageService , private authService:LoginService , private subscriberService:SubscriberService ) { }


  ngOnInit(): void {

    this.sessionData = sessionStorage.getItem('username');
    this.currentUser = this.authService.CurrentUser;
    
  }



  async onSubmit(subscriberForm : NgForm) {
    
    this.subscriber.user = this.currentUser;
    this.subscriber.user_Update= this.currentUser;
    
    this.subscriberService.saveSubscriber( this.subscriber ).subscribe(
      response => {
        this.message.success("Souscripteur ajouté avec succès!");
        this.router.navigate(['subscriber/list-subscriber']);
      },
      error => {
        this.message.error("Enegistrement Souscripteur impossible! " + error.message);
      }
    );

  }


}
