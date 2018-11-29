import {AuthService, SocialUser} from "angularx-social-login";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Injectable()
export class  LoginService {
    API_URL = 'http://localhost:8000';
    loggedIn: boolean;
    user: SocialUser;
    constructor(private http: HttpClient,
                private router: Router,
                private  authService: AuthService) {
        this.authService.authState.subscribe((user) => {
            this.user = user;
            this.loggedIn = (user != null);
            this.setUser(user);
            this.router.navigate( ['/ingredients']);
        });
    }

    setUser(userLogin: SocialUser) {
        this.user = userLogin;
    }

    getUsersDatabase(): Observable<any> {
        return this.http.get(this.API_URL + '/utilisateurs.json');
    }

    postUserGoogleDataBase(user): Observable<any> {
        return this.http.post(this.API_URL + '/utilisateurs.json', {nomutilisateur: user.name})
    }

    getAuthService(): AuthService{
        return this.authService;
    }

    getUser(): SocialUser {
        return this.user;
    }


}