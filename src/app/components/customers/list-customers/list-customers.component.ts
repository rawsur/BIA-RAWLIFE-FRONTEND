import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Customer } from 'src/app/models/customers/customer';
import { Subscriber } from 'src/app/models/subscribers/subscriber';
import { CustomerService } from 'src/app/services/customers/customer.service';
import { SubscriberService } from 'src/app/services/subscribers/subscriber.service';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.scss']
})
export class ListCustomersComponent implements OnInit {

  customers : Customer[];
  subscribers: Subscriber[];
  customer:Customer;
  isVisible:boolean;
  isVisibleEdit:boolean;
  dateFormat:string="dd/MM/YYYY";

  constructor( private message: NzMessageService , private modal: NzModalService , private subService:SubscriberService , private custService : CustomerService ) { }

  ngOnInit(): void {
    this.getCustomers();
    this.getSubscribers();
  }

  getCustomers() {
    this.custService.getCustomers().subscribe(
      response => {
        this.customers = response;
      } ,
      error => {
        this.message.error("Impossible de charger la liste de clients. " + error.status );
      }
    )
  }

  getSubscribers() {
    this.subService.getSubscribers().subscribe(
      response => {
        this.subscribers = response;
      }
    )
  }


  showCustomer( cust:Customer ): void {
    this.isVisible = true;
    this.customer = cust;
  }

  handleOk() {
    this.isVisible=false;
    this.isVisibleEdit = false;
  }

  handleCancel(){
    this.isVisible=false;
    this.isVisibleEdit = false;
  }


  /**
   * 
   * @param cust :Customer Parameter to Update
   * @returns : Return Update DialogBox.
   * 
   */
  editCustomer( cust:Customer ): void {
    this.isVisibleEdit = true;
    this.customer = cust;
  }


  /**
   * 
   * @param cust :Customer Parameter to Update
   * @returns : Confirmation Update DialogBox.
   * 
   */
  updateCustomer( cust:Customer ){
    this.customer = cust;
    this.custService.updateCustomer(this.customer.id, this.customer).subscribe(
      response  => {
        this.message.success("MAJ Client" + cust.fullname + "effectué avec succès!");
        this.getCustomers();
      }
    );
  }


  /**
   * 
   * @param cust :Customer Parameter to Delete
   * @returns : Confirmation Delete DialogBox.
   * 
   */
  showDeleteConfirm(cust:Customer): void {
    this.modal.confirm({
      nzTitle: 'Etes-vous sûr de supprimer cet élément ?',
      nzContent: '<b style="color: red;"> Package : </b>' 
                  + cust.fullname+  
                  ''+
                  
                  '<p> <b>Adresse : </b> ' 
                  + cust.address+  
                  '</p>'+

                  '<p> <b>Phone Number : </b> ' 
                  + cust.phoneNumber+  
                  '</p>'+

                  '<p> <b> Cr&eacute;&eacute; Par : </b> ' 
                  + cust.user.username+  
                  '</p>'+
                  '<p> <b>Cr&eacute;&eacute; Le : </b> ' 
                  + cust.createdAt + 
                  '</p>',

      nzOkText: 'Oui',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteCustomer(cust),
      nzCancelText: 'Non',
      nzOnCancel: () => console.log('Cancel')
    });
  }


  /**
   * 
   * @param cust :Customer Parameter to Update
   * @returns : Confirmation Delete Message.
   * 
   */
  deleteCustomer( cust:Customer) {
    this.custService.deleteCustomer( cust.id , cust ).subscribe(
      response  => {
        console.log("Customer deleted ! " );
        this.message.success("Client supprimé avec succès!");
        this.getCustomers();
      }
    )
  }

  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.id === o2.id : o1 === o2);

}
