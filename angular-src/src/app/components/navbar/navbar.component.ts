import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _auth: AuthService,
              private _flash: FlashMessagesService,
              private _router:Router) { }

  ngOnInit() {
  }

  onLogoutClick(){
    this._auth.logOut();
    this._router.navigate(['/login']);
    return false;
  }
}
