import { Component, OnInit } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {AuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser} from "angularx-social-login";
import {LoginService} from "../service/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    private user: SocialUser;
    private loggedIn: boolean;

  constructor( private authService: AuthService,
               private http: HttpClient,
               private loginService: LoginService) { }

    ngOnInit() {
        this.authService.authState.subscribe((user) => {
            this.user = user;
            this.loggedIn = (user != null);
            this.loginService.setUser(user);
            this.loginService.loggedIn  = this.loggedIn;
        })
    }
    signInWithGoogle(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    signInWithFB(): void {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    }

    signOut(): void {
        this.authService.signOut();
    }


}
