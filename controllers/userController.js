const userService = require("../service/userService");

class UserController {
    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }
    async getUser(req, res, next) {
        try {
            const userId = req.params.id
            const user = await userService.getUserById(userId);
            return res.json(user);
        } catch (e) {
            next(e);
        }
    }
    async updateUser(req, res, next) {
        try {
            const { fullName, aboutInfo, email, avatarPath } = req.body;
            const userId = req.params.id
            const user = await userService.updateUser({ userId, fullName, aboutInfo, email, avatarPath });
            return res.json(user);
        } catch (e) {
            next(e);
        }
    }
    async upload(req, res, next) {
        try {
            res.json({
                url: `/uploads/${req.file.originalname}`,
            });
        } catch (e) {
            next(e);
        }
    }

    async activate(req, res, next) {
        try {
            const userId = req.params.userId;
            const activationCode = req.params.code;
            const user = await userService.activate(activationCode, userId);
            return res.json(user);
        } catch (e) {
            next(e);
        }
    }
}


module.exports = new UserController();