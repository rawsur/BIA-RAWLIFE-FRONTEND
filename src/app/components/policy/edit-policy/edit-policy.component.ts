import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Package } from 'src/app/models/packages/package';
import { Policy } from 'src/app/models/policies/policy';
import { PackageService } from 'src/app/services/packages/package.service';
import { PolicyService } from 'src/app/services/policies/policy.service';

@Component({
  selector: 'app-edit-policy',
  templateUrl: './edit-policy.component.html',
  styleUrls: ['./edit-policy.component.scss']
})
export class EditPolicyComponent implements OnInit {


  dateFormat = 'dd/MM/yyyy';
  id:number;
  policy:Policy;
  editCustomerForm:FormGroup;
  sessionData:any;
  pkgs:Package [];

  constructor( private fb:FormBuilder , private route: ActivatedRoute, private message: NzMessageService , private polService: PolicyService , private pkgService : PackageService ) { }

  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.value === o2.value : o1 === o2);

  ngOnInit(): void {
    this.initeditCustomerForm();
    this.getPackages();
    let ids = Number(this.route.snapshot.paramMap.get('id') );
    this.id = ids;
    this.getPolicyById(this.id);
    this.sessionData = sessionStorage.getItem('username');

  }

  async getPackages () {

    await this.pkgService.getPackages().subscribe(
      data => {
        this.pkgs = data;
      },  error => {
        console.log(error);
      }
    )

  }

  initeditCustomerForm() {
    this.editCustomerForm = this.fb.group({
      accountNumber: ['', [Validators.required, Validators.minLength(10) , Validators.maxLength(255)] ],
      fullname: ['', Validators.required],
      sex: ['', Validators.required],
      dob: ['', Validators.required ],
      poBirth: ['', Validators.nullValidator],
      address: ['', Validators.required],
      phoneNumber: [''],
      pkg: ['', [ Validators.required ]],
      effect_date:['', [ Validators.required]],
      user:['', [ Validators.required]],
    });
  }

  getPolicyById( ident:number ) {

    if ( typeof(this.id)=='number' ) {

      this.polService.getPolicyById(ident).subscribe(
        response => {
          this.policy = response;
        }, error => {
          console.log("Error Get Policy : " + error );
        }
      );
    }
    
  }

  onSubmit( policy_toupdate:Policy ) {
    this.polService.updatePolicy( policy_toupdate.id , policy_toupdate ).subscribe(
      response =>  {
        this.message.success("Police actualisé avec succès!");
      }
    );
  }

  



}
