import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { HubConnection } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private chatConnection?:HubConnection

  constructor(private httpClient:HttpClient) { }

  registerUser(user:User){
    return this.httpClient.post(`${environment.apiUrl}api/chat/register-user`,user,{responseType:'text'})
  }
}
