const { validationResult } = require('express-validator')
const { ErrorHandler } = require("../exceptions/api-error")
const authService = require('../service/authService');
const ApiError = require('../exceptions/api-error')

class AuthController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest(400, 'Ошибка при валидации', errors.array()))
            }
            const { fullName, email, password } = req.body;
            const userData = await authService.registration(fullName, email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async login(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest(400, 'Ошибка при валидации', errors.array()))
            }
            const { email, password } = req.body;
            const userData = await authService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await authService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await authService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async activate(req, res, next) {
        try {

        } catch (e) {
            next(e);
        }
    }
}

module.exports = new AuthController();