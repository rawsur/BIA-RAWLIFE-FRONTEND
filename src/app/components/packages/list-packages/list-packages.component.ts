import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Package } from 'src/app/models/packages/package';
import { Policy } from 'src/app/models/policies/policy';
import { Subscriber } from 'src/app/models/subscribers/subscriber';
import { PackageService } from 'src/app/services/packages/package.service';
import { SubscriberService } from 'src/app/services/subscribers/subscriber.service';

@Component({
  selector: 'app-list-packages',
  templateUrl: './list-packages.component.html',
  styleUrls: ['./list-packages.component.scss']
})
export class ListPackagesComponent implements OnInit {
  
  packages: Package[];
  subscribers:Subscriber[];
  isVisible:boolean;
  isEditable:boolean;
  package:Package;
  dateFormat:string="dd/MM/YYYY";

  constructor( private message: NzMessageService , private modal: NzModalService , private subService:SubscriberService , private pkgService:PackageService ) { }

  ngOnInit(): void {
    this.getPackages();
    this.getSubscribers();
  }

  getPackages() {
    this.pkgService.getPackages().subscribe(
      response => {
        this.packages = response;
        console.log(response);
      }
    )
  }

  getSubscribers() {
    this.subService.getSubscribers().subscribe(
      response => {
        this.subscribers = response;
        console.log(response);
      }
    )
  }

  showPackage( pk:Package ): void {
    this.isVisible = true;
    this.package = pk;
  }

  handleOk() {
    this.isVisible=false;
    this.isEditable=false;
  }

  handleOkEditPackage( pkg:Package ) {
    this.pkgService.updatePackage( pkg.id , pkg ).subscribe(
      response  => {
        this.message.success("Package modifiée avec succès!");
        this.isVisible=false;
        this.isEditable=false;
        this.getPackages();
      },  error  => {
        this.message.error("Impossible de charger les packages. " +error.message );
      }
  );
  }

  handleCancel(){
    this.isVisible=false;
    this.isEditable=false;
  }

  /**
   * @param pkg : The Package to Edit
   */
  editPackage(pkg:Package) : void {
    this.isEditable=true;
    this.package = pkg;
  }

  showDeleteConfirm(pkg:Package): void {
    this.modal.confirm({
      nzTitle: 'Etes-vous sûr de supprimer cet élément ?',
      nzContent: '<b style="color: red;"> Package : </b>' 
                  + pkg.name+  
                  ''+
                  '<p> <b>Souscripteur : </b> ' 
                  + pkg.subscriber.name +  
                  '</p>'+
                  
                  '<p> <b>Capital : </b> ' 
                  + pkg.capital+  
                  '</p>'+

                  '<p> <b>Prime : </b> ' 
                  + pkg.premium+  
                  '</p>'+

                  '<p> <b> Cr&eacute;&eacute; Par : </b> ' 
                  + pkg.user.username+  
                  '</p>'+
                  '<p> <b>Cr&eacute;&eacute; Le : </b> ' 
                  + pkg.createdAt + 
                  '</p>',

      nzOkText: 'Oui',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deletePackage(pkg),
      nzCancelText: 'Non',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  deletePackage( pkg:Package) {
    this.pkgService.deletePackage( pkg.id , pkg ).subscribe(
      response  => {
        console.log("Package deleted ! " );
        this.message.error("Package supprimé avec succès!");
        this.getPackages();
      }
    )
  }

  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.id === o2.id : o1 === o2);

}
