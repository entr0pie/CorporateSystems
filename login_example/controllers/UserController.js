import { UserService } from "../services/UserService.js";

export class UserController {

    /**
     * @param {UserService} userService 
     */
    constructor(userService) {
        this.userService = userService;
    }

    async register(req, res) {
        const { email, password } = req.body;
        
        try {
            const createdUser = await this.userService.create(email, password);
            return res.status(204).send();
        } catch (e) {
            return res.status(403).send();
        }
    }

    async login(req, res) {
        const { email, password } = req.body;
        try {
            const token = await this.userService.login(email, password);
            return res.json({ access_token: token });
        } catch (e) {
            console.log(e);
            return res.status(403).send();
        }
    }
}