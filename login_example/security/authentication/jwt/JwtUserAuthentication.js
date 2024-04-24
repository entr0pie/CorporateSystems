import { UserAuthentication } from "../UserAuthentication.js";

export class JwtUserAuthentication extends UserAuthentication {

    constructor(subject, authorities) {
        super();
        this._subject = subject;
        this._authorities = authorities;
    }

}