import { Component, OnInit } from '@angular/core';
import {AppService} from "../app.service";

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  public newsLetterSubscriptions:Array<any> = [];
  statusMessage:string = ''

  constructor(private appService:AppService) { }

  ngOnInit() {
  }

  getAllSubscriptions(){
    this.statusMessage = 'Loading...';
    this.newsLetterSubscriptions = [];
    this.appService.getAllSubscriptions().subscribe( res => {
      //console.log(res);
      if(res.status == 200 ){
        this.statusMessage = '';
        this.newsLetterSubscriptions = res.data;
      }else{
        this.statusMessage = res.messages;
      }
    })
  }

}
