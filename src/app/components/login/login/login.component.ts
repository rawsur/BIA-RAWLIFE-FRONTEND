import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AppConfigService } from 'src/app/services/app-config.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  validateForm!: FormGroup;
  appName:any;
  appOwner:any;
  ownerPhone:any;
  ownerAddress:any;
  logo:any;

  constructor(  private message: NzMessageService ,private fb: FormBuilder , private router:Router , private appConfig:AppConfigService , private loginservice:LoginService, private titleService:Title ) {}
  

  uname = ''
  pwd = ''
  invalidLogin = false
  msg:string;

  ngOnInit(): void {

    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });

    this.appName = this.appConfig.appName;
    this.appOwner = this.appConfig.appOwner;
    this.logo = this.appConfig.logo;
    this.ownerAddress = this.appConfig.ownerAddress;
    this.ownerPhone = this.appConfig.ownerPhone;

    this.titleService.setTitle( this.appConfig.appOwner + " - "  + this.appConfig.appName );
  }

  checkLogin() {

    this.uname = this.validateForm.controls['username'].value;
    this.pwd   = this.validateForm.controls['password'].value;

    (
      this.loginservice.authenticate(this.uname, this.pwd).subscribe(
      data => {
        this.router.navigate(['policy/list-policy']);
        this.invalidLogin = false;
      },
      error => {
        this.invalidLogin = true;
        this.msg = "Problème Authentification. ";
        this.message.error( this.msg );

        this.msg = "Merci de vérifier vos identifiants";
        this.message.error( this.msg );

        this.msg= "Code Erreur : " + error.status;
        this.message.error( this.msg );

        this.msg= "Message Erreur : " +error.message;
        this.message.error( this.msg );

      }
    )
    );

  }

}
