import { Component, OnInit } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-footers',
  templateUrl: './footers.component.html',
  styleUrls: ['./footers.component.scss']
})
export class FootersComponent implements OnInit {

  constructor( private appService:AppConfigService ) { }

  appOwner:string;
  ngOnInit(): void {
    this.appOwner = this.appService.appOwner;
  }

}
