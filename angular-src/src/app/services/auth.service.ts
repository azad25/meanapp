import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { config }  from '../../config';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private _http: Http) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this._http.post(config.host+'users/register' , user,{headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this._http.post(config.host+'users/authenticate' , user,{headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('userdata', JSON.stringify(user));

    this.authToken = token;
    this.user = user;
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');

    return this._http.get(config.host+'users/profile', {headers: headers})
      .map(res => res.json());
  }

  loadToken(){
    this.authToken = localStorage.getItem('id_token'); 
  }

  loggedIn(){
    return tokenNotExpired('id_token');
  }

  logOut(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}