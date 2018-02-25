import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:string;
  password:string;

  constructor(private _auth: AuthService,
              private _flash: FlashMessagesService,
              private _router:Router) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    let user = {
      username: this.username,
      password: this.password
    }

    this._auth.authenticateUser(user).subscribe(data => {
      if(data.success){
        this._auth.storeUserData(data.token, data.usercache);
        this._router.navigate(['dashboard']);
      }else{
        this._flash.show(data.msg, {
          cssClass:'alert alert-danger',
          timeOut: 3000
        });
        this._router.navigate(['/login']);
      }
    });
  }
}
