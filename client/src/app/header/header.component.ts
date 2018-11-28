import { Component, OnInit } from '@angular/core';
import {LoginService} from "../service/login.service";
import {SocialUser} from "angularx-social-login";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    isLogin: boolean;
    user : SocialUser;
  constructor(private loginService: LoginService) { }

  ngOnInit() {


  }

  loggin(){
      this.isLogin= this.loginService.loggedIn;
      this.user = this.loginService.user;
      this.loginService.refresh();
  }
}
