import { AuthenticationManager } from "../manager/AuthenticationManager.js";
import jwt from "jsonwebtoken";
import { JwtUserAuthentication } from "./JwtUserAuthentication.js";

export class JwtManager extends AuthenticationManager {

    /**
     * @param {string} jwtSecret 
     */
    constructor(jwtSecret) {
        super();
        this._secret = jwtSecret;
    }
    
    async create(subject, authorities) {
        const payload = {
            sub: subject,
            roles: authorities,
        };    
        
        return jwt.sign(payload, this._secret);
    }

    async validate(token) {
        const validatedToken = jwt.verify(token, this._secret);
        return new JwtUserAuthentication(validatedToken.sub, validatedToken.roles);
    }

}