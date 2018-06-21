import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Rx";

@Injectable()
export class AppService{

  API_GATEWAY:string = "https://bkctg8sqij.execute-api.us-east-2.amazonaws.com/prod";

  constructor(private httpClient:HttpClient){

  }

  subscribeToNewsLetter(data:any):Observable<any>{

    return this.httpClient.post(this.API_GATEWAY + "/subscribe", data);
  }

  unSubscribeToNewsLetter(data:any):Observable<any>{

    return this.httpClient.post(this.API_GATEWAY + "/unsubscribe", data);
  }

  getAllSubscriptions():Observable<any> {
    return this.httpClient.get(this.API_GATEWAY + "/listsubscribers");
  }
}
