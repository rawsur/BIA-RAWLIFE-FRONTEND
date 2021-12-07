import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  gridStyle = {
    margin: '10px',
    height:'auto',
    width:'auto',
    textAlign: 'left'
  };

  constructor( private router:Router , private titleService:Title ) { }

  ngOnInit(): void {
    this.titleService.setTitle("RAWSUR -- Modules");
  }

  gotoBIA() {
    this.router.navigate(['policy/list-policy']);
  }

  gotoASV() {
    this.router.navigate(['asv/list-asv']);
  }

}
