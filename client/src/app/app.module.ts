import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule, Routes} from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { OAuthModule } from "angular-oauth2-oidc";
import { HomeComponent } from './home/home.component';
import { AuthGuard } from "./shared/auth/auth.guard.service";
import { EditComponent } from "./edit/edit.component";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import {FacebookModule} from "ng2-facebook-sdk";
import {AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider, SocialLoginModule} from "angular4-social-login";
import secrets from "./secret";

const appRoutes: Routes = [
    { path: 'edit/:id', component: EditComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
   // { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' }
];

let config = new AuthServiceConfig([
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(secrets.googleAppIdClient)
    },
    {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider(secrets.facebookAppId)
    }
]);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EditComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      HttpClientModule,
      OAuthModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      FacebookModule.forRoot(),
      SocialLoginModule.initialize(config),

  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
