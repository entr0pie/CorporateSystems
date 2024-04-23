import { PasswordManager } from "../PasswordManager.js";
import { hash, compare } from "bcrypt";

export class BcryptPasswordManager extends PasswordManager {
    
    /**
     * @param {number} saltRounds 
     */
    constructor(saltRounds) {
        super();
        this._saltRounds = saltRounds;
    }
    
    /**
     * Hashes a password to bcrypt format
     * @param {string} rawPassword 
     * @returns {string} hashed password
     */
    async encrypt(rawPassword) {
        return await hash(rawPassword, this._saltRounds);
    }

    /**
     * Verify if a raw password matches its hashed version
     * 
     * @param {string} rawPassword 
     * @param {string} encryptedPassword 
     * @returns {boolean} match
     */
    async verify(rawPassword, encryptedPassword) {
        return await compare(rawPassword, encryptedPassword);
    }
}