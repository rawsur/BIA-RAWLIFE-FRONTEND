import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { Currency } from 'src/app/models/currency/currency';
import { User } from 'src/app/models/users/user';
import { CurrencyService } from 'src/app/services/currency/currency.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-list-currencies',
  templateUrl: './list-currencies.component.html',
  styleUrls: ['./list-currencies.component.scss']
})
export class ListCurrenciesComponent implements OnInit {

  sessionData:any;
  currencies:Currency[];
  isVisible:boolean;
  isEditable:boolean;
  currency:Currency;
  dateFormat:string="dd/MM/YYYY";
  subscription:Subscription;
  currentUser:User;


 constructor( private message: NzMessageService , private modal: NzModalService , private currencyService:CurrencyService  , private userService:LoginService ) { }

 
  ngOnInit(): void {
    
    this.sessionData = sessionStorage.getItem('username');
    this.getCurrencies();

  }

  

  async getCurrencies() {
    await this.currencyService.getCurrencies().subscribe(
      response => {
        this.currencies = response;
        console.log(response);
      }
    )
  }

  showCurrency( curr:Currency ): void {
    this.isVisible = true;
    this.currency = curr;
  }

  handleOk() {
    this.isVisible=false;
    this.isEditable=false;
  }

  handleCancel(){
    this.isVisible=false;
    this.isEditable=false;
  }

  async handleOkEditCurrency( curr:Currency ) {
    
    let uname:string = this.sessionData;
    curr.user_update  = this.currentUser;
    this.currencyService.updateCurrency( curr.id , curr ).subscribe
    (
            response  => {
              this.message.success("Devise modifiée avec succès!");
              this.isVisible=false;
              this.isEditable=false;
              this.getCurrencies();
            }, error  => { console.log(error) }
    );
    
  }


  /**
   * @param curr : The Currency to Edit
   */
   editCurrency(curr:Currency) : void {
    this.isEditable=true;
    this.currency = curr;
  }

  showDeleteConfirm(curr:Currency): void {
    this.modal.confirm({
      nzTitle: 'Etes-vous sûr de supprimer cet élément ?',
      nzContent: '<b style="color: red;"> Devise : </b>' 
                  + curr.name+  
                  ''+
                  '<p> <b>Souscripteur : </b> ' 
                  + curr.isocode +  
                  '</p>'+
                  '<p> <b>Cr&eacute;&eacute; Le : </b> ' 
                  + curr.createdAt + 
                  '</p>',

      nzOkText: 'Oui',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteCurrency(curr),
      nzCancelText: 'Non',
      nzOnCancel: () => console.log('Cancel')
    });
  }


  deleteCurrency( curr:Currency) {
    this.currencyService.deleteCurrency( curr.id , curr ).subscribe(
      response  => {
        console.log("Devise deleted ! " );
        this.message.error("Devise supprimé avec succès!");
        this.getCurrencies();
      }
    )
  }

  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.id === o2.id : o1 === o2);




}
