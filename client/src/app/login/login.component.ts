import { Component, OnInit } from '@angular/core';
import {FacebookService, InitParams, LoginResponse} from "ng2-facebook-sdk";
import {Router} from "@angular/router";

import {HttpClient} from "@angular/common/http";
import {AuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser} from "angular4-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    private user: SocialUser;
    private loggedIn: boolean;

  constructor( private authService: AuthService,
               private http: HttpClient) { }

    ngOnInit() {
        this.authService.authState.subscribe((user) => {
            this.user = user;
            this.loggedIn = (user != null);
        });
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
