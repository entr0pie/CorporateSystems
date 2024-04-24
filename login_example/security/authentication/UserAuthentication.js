
export class UserAuthentication {
    
    /**
     * @type {string}  
     */ 
    _subject;

    /**
     * @type {string[]}
     */
    _authorities;

    getSubject() { 
        return this._subject;
    }

    getAuthorities() {
        return this._authorities;
    }

}