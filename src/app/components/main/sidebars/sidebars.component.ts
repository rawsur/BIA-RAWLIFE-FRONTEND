import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-sidebars',
  templateUrl: './sidebars.component.html',
  styleUrls: ['./sidebars.component.scss']
})
export class SidebarsComponent implements OnInit {

  sessionrole:any;
  constructor( private router:Router, private loginService:LoginService ) { }

  ngOnInit(): void {
    this.sessionrole = sessionStorage.getItem('roles');
  }

  logout() {
    this.loginService.logOut();
    this.router.navigate(['logout']);
  }

}
