import { Component, OnInit } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {AuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser} from "angularx-social-login";
import {LoginService} from "../service/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    private user: SocialUser;
    private loggedIn: boolean;
    private users: any;
    private allUsers: any;

  constructor( private authService: AuthService,
               private http: HttpClient,
               private loginService: LoginService,
               private router: Router,) { }

    ngOnInit() {
        this.loginService.getUsersDatabase()
            .subscribe( users => {
                this.users = users;
               console.log(this.users);
            });
    }
    signInWithGoogle(): void {

        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
        if (this.loggedIn) {
        }
    }

    signInWithFB(): void {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    }

    signOut(): void {
        this.authService.signOut();
    }

}
