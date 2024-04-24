import { UserAuthentication } from "../UserAuthentication.js";

export class AuthenticationManager {
    
    /**
     * Creates a new token
     * @param {string} subject 
     * @param {string[]} authorities 
     * @returns {string} token
     */
    async create(subject, authorities) {
        throw new Error();
    }
    /**
     * Validates a token
     * @param {string} token
     * @returns {UserAuthentication} user authentication 
     */
    async validate(token) {
        throw new Error();
    }
}