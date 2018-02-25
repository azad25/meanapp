import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { config }  from '../../config';

@Injectable()
export class AuthService {
  autheToken: any;
  user: any;

  constructor(private _http: Http) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this._http.post(config.host+'users/register' , user,{headers: headers})
      .map(res => res.json());
  }
}