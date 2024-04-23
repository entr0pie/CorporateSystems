export class PasswordManager {
    /**
     * Encrypt a password
     * @param {string} rawPassword 
     * @return {string} encrypted password
     */
    async encrypt(rawPassword) {
        throw new Error();
    }

    /**
     * Verify if a password is equal to the encrypted version
     * @param {string} rawPassword 
     * @param {string} encryptedPassword 
     */
    async verify(rawPassword, encryptedPassword) {
        throw new Error();
    }
}