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
            const responseBody = {
                access_token: token
            };

            return res.send(responseBody);
        } catch (e) {
            return res.status(403).send();
        }
    }

    async findByID(req, res) {
        const { id } = req.query;
        try {
            const user = await this.userService.findByID(id);
            return res.send(user);
        } catch (e) {
            return res.status(404).send();
        }
    }
}