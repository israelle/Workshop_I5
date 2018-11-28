import {SocialUser} from "angularx-social-login";

export class  LoginService {

    loggedIn: boolean;
    user: SocialUser;
    constructor() {

    }

    setUser(userLogin: SocialUser) {
        this.user = userLogin;
    }

     refresh() {
        window.location.reload();
    }

}