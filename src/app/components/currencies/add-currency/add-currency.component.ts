import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Currency } from 'src/app/models/currency/currency';
import { User } from 'src/app/models/users/user';
import { CurrencyService } from 'src/app/services/currency/currency.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-add-currency',
  templateUrl: './add-currency.component.html',
  styleUrls: ['./add-currency.component.scss']
})
export class AddCurrencyComponent implements OnInit {


  header="Informations Devise";
  dateFormat = 'dd/MM/yyyy';
  currencyForm: FormGroup;
  currency:Currency;
  sessionData:any;
  currencies:Currency [];
  current = 0;

  constructor( private route:Router , private currencyService:CurrencyService , private message: NzMessageService ,  private fb: FormBuilder , private userService:LoginService ) { }

  ngOnInit(): void {
    this.sessionData = sessionStorage.getItem('username');
    this.initForms();
  }

  initForms() {
    this.currencyForm = this.fb.group({
      currencyName: ['', Validators.required],
      codiso: ['', [Validators.required, Validators.minLength(1) , Validators.maxLength(3)]],
      user:['', [ Validators.required]],
    });
  }

  async SaveCurrency( ) {
    this.currency = new Currency();
    
    this.currency.name = this.currencyForm.controls['currencyName'].value;
    this.currency.isocode = this.currencyForm.controls['codiso'].value;

    let uname:string = this.currencyForm.controls['user'].value;

    await this.userService.getUser(uname).then(
      response=> {
        let u = new User();
        u.id = response.id;
        u.role=response.password;
        u.subscriber = response.subscriber
        u.username = response.username;
        this.currency.user = u;
        this.currency.user_update  = u;
      }
    )


    await this.currencyService.saveCurrency(this.currency ).subscribe( 
      response=> {
        this.message.success("Devise créée avec succès!");
        this.route.navigate(['/currency/list-currency']);
      }, error=> { this.message.error( " Erreur Cr&eacute;tion Devise" + error.message); }
    );

  }

}
