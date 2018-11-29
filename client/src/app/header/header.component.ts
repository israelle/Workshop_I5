import { Component, OnInit } from '@angular/core';
import { LoginService } from "../service/login.service";
import { AuthService, SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    isLogin: boolean;
    user : SocialUser;
  constructor(private loginService: LoginService,
              private authService: AuthService) {
      console.log('loginservice', loginService);
      if (loginService.getUser()) {
          this.user = loginService.getUser();
          console.log('test3', this.user);
          this.isLogin = true;
      }
  }

  ngOnInit() {
      console.log('oui ', this.loginService);
      console.log('oui ', this.loginService.getUser());
  }

  loggin(){
      this.isLogin= this.loginService.loggedIn;
      this.user = this.loginService.user;
  }
}
