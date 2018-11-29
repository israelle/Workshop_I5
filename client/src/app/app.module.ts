import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule, Routes} from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import { AuthGuard } from "./shared/auth/auth.guard.service";
import { EditComponent } from "./edit/edit.component";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import secrets from "./secret";
import { IngredientsComponent } from './ingredients/ingredients.component';
import { AuthServiceConfig, GoogleLoginProvider, SocialLoginModule } from "angularx-social-login";
import {LoginService} from "./service/login.service";
import { FormsModule } from '@angular/forms';
import {NgSelectModule} from "@ng-select/ng-select";
import { JoinUsComponent } from './join-us/join-us.component';
import {AgmCoreModule} from "@agm/core";

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'ingredients', component: IngredientsComponent },
    { path: 'joinUs', component: JoinUsComponent },
   // { path: 'profil/:id', redirectTo: 'myProfil' },
    { path: '**', redirectTo: 'home' },
    // { path: 'ingredients', redirectTo: 'ingredients' },
];

let config = new AuthServiceConfig([
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(secrets.googleAppIdClient)
    },
]);
export function provideConfig() {
    return config;
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EditComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    IngredientsComponent,
    JoinUsComponent
  ],
  imports: [
    BrowserModule,
    NgSelectModule,
    FormsModule,
    AppRoutingModule,
      HttpClientModule,
      RouterModule.forRoot(appRoutes),
      SocialLoginModule,
      AgmCoreModule.forRoot({
          apiKey: 'AIzaSyBCxz26JzBqYQ6ZxaTtjbFskCWUy8hk5Nk'
      })

  ],
  providers: [{
      provide: AuthServiceConfig,
      useFactory: provideConfig
  },
      LoginService,
  ],
  bootstrap: [AppComponent, IngredientsComponent]
})
export class AppModule { }
