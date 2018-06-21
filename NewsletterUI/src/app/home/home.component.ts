import {Component} from '@angular/core';
import {AppService} from "../app.service";

@Component({
  selector: 'home-root',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  email:string = '';
  showErrorResponse:boolean = false;
  showMessage:string = '';

  constructor(private appService:AppService) {
  }

  onChange(){
    this.showErrorResponse = false;
    this.showMessage = '';
  }
  onSubmit() {
    this.showErrorResponse = false;
    this.showMessage = 'working on it...';
    this.appService.subscribeToNewsLetter({body: {email: this.email}}).subscribe(res => {
      if(res.status != 200){
        this.showErrorResponse = true;
      }

      this.showMessage = res.message;

    })
  }

  onUnSubScribe(){
    this.showErrorResponse = false;
    this.showMessage = 'working on it...';
    this.appService.unSubscribeToNewsLetter({body: {email: this.email}}).subscribe(res => {
      if(res.status != 200){
        this.showErrorResponse = true;
      }

      this.showMessage = res.message;

    })
  }
}
