const jwt = require('jsonwebtoken');
const tokenModel = require('../models/tokenModel');

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, 'secret-access123', {expiresIn: '1h'})
        const refreshToken = jwt.sign(payload, 'secret-refresh123', {expiresIn: '3h'})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, 'secret-access123');
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, 'secret-refresh123');
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({user: userId})
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await tokenModel.create({user: userId, refreshToken})
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await tokenModel.deleteOne({refreshToken})
        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await tokenModel.findOne({refreshToken})
        return tokenData;
    }
}

module.exports = new TokenService();