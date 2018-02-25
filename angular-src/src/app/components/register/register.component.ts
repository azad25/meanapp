import { Component, OnInit } from '@angular/core';

import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private _validateService: ValidateService,
              private _flashMessage: FlashMessagesService,
              private _auth: AuthService,
              private _router: Router) 
              { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user={
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    //Required Fields
    if(!this._validateService.validateRegister(user)){
      this._flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeOut:3000});
      return false;
    }
    if(!this._validateService.validateEmail(user.email)){
      this._flashMessage.show('Please fill in email', {cssClass: 'alert-danger', timeOut:3000});
      return false;
    }

    this._auth.registerUser(user).subscribe(data => {
      if(data.success){
        this._flashMessage.show('You are registered!', {cssClass: 'alert-success', timeOut:3000});
        this._router.navigate(['/login']);
      }else{
        this._flashMessage.show('Oops! Shit Happened', {cssClass: 'alert-danger', timeOut:3000});
        this._router.navigate(['/register']);
        console.log(data);
      }
    });
  }

}
