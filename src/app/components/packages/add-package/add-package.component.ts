import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Package } from 'src/app/models/packages/package';
import { Subscriber } from 'src/app/models/subscribers/subscriber';
import { LoginService } from 'src/app/services/login/login.service';
import { PackageService } from 'src/app/services/packages/package.service';
import { SubscriberService } from 'src/app/services/subscribers/subscriber.service';

@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.scss']
})
export class AddPackageComponent implements OnInit {

  header="Informations Package";
  dateFormat = 'dd/MM/yyyy';
  packageForm: FormGroup;
  package:Package;
  sessionData:any;
  subscribers:Subscriber [];
  current = 0;

  constructor( private route:Router , private subscrService:SubscriberService , private fb: FormBuilder , private pkgService:PackageService , private userService:LoginService ) { }

  ngOnInit(): void {
    this.sessionData = sessionStorage.getItem('username');
    this.initForms();
    this.getSubscribers();
  }

  async getSubscribers () {

    await this.subscrService.getSubscribers().subscribe(
      response => {
        this.subscribers = response;
      },  error => {
        console.log(error);
      }
    )

  }

  initForms() {
    this.packageForm = this.fb.group({
      pkgName: ['', Validators.required],
      capital: ['', Validators.required],
      premium: ['', Validators.required],
      subscriber:['', [ Validators.required ]],
      user:['', [ Validators.required]],
    });
  }

  async SavePackage( ) {
    this.package = new Package();
    
    this.package.name = this.packageForm.controls['pkgName'].value;
    this.package.capital = this.packageForm.controls['capital'].value;
    this.package.premium = this.packageForm.controls['premium'].value;
    this.package.subscriber = this.packageForm.controls['subscriber'].value;

    let uname:string = this.packageForm.controls['user'].value;

    this.package.user = await this.userService.getUser( uname );
    this.package.user_Updated = this.package.user;

    await this.pkgService.savePackage( this.package ).subscribe( 
      data=> {
        console.log("Package Saved successfully!");
        this.route.navigate(['/package/list-package']);
      }, error=> { console.log(error); }
    );

  }

}
