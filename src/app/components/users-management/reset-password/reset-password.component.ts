import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { User } from 'src/app/models/users/user';
import { AppConfigService } from 'src/app/services/app-config.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  passwordForm:FormGroup;
  sessionData:any;
  header="Changement mot de passe!";
  user:User;
  currentUser:User = new User();

  constructor( private appConfig:AppConfigService , private message:NzMessageService, private modalService:NzModalService , private titleService:Title , private authService:LoginService , private fb:FormBuilder , private route:Router ) { }

  ngOnInit(): void {

    this.currentUser = this.authService.CurrentUser;

    this.titleService.setTitle( this.appConfig.appName+ " - Changement mot de passe! " );
    this.sessionData = sessionStorage.getItem('username');
    this.initForms();
  }

  initForms() {
    this.passwordForm = this.fb.group({
      oldPwd: ['', Validators.required],
      newPwd: ['', [Validators.required, Validators.minLength(5) , Validators.maxLength(30)]],
      confirmPwd:['', [ Validators.required , this.confirmValidator] ],
      user:['', [ Validators.required]],
    });
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.passwordForm.reset();
    this.passwordForm.controls['user'].setValue(this.sessionData);
    for (const key in this.passwordForm.controls) {
      if (this.passwordForm.controls.hasOwnProperty(key)) {
        this.passwordForm.controls[key].markAsPristine();
        this.passwordForm.controls[key].updateValueAndValidity();
      }
    }
  }


  validateConfirmPassword(): void {
    setTimeout(() => this.passwordForm.controls.confirmPwd.updateValueAndValidity());
  }


  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
      if (!control.value) 
      {
        return { error: true, required: true };
      } else if (control.value !== this.passwordForm.controls.newPwd.value) 
      {
        return { confirm: true, error: true };
      }
      return {};
  };

  async changePwd(){
    
    this.user = new User();
    let uname:string = this.passwordForm.controls['user'].value;

    // this.user = await this.authService.getUser( uname );
    this.user = this.authService.CurrentUser;

    let newPwd:string = this.passwordForm.controls['confirmPwd'].value;
    let oldPwd:string = this.passwordForm.controls['oldPwd'].value;

    this.user.password = newPwd;

    this.authService.changeUserPwd( this.user.id, newPwd ).subscribe(
      response=> {
        this.message.success(" Mot de passe changé avec succès! ");
        // this.route.navigate(['/policy/list-policy']);
      }, error=> { 
        this.message.error("Impossible de changer le mot de passe.");
        this.message.error("Erreur : " +error.error.message );
      }
    );
    
  }

}
