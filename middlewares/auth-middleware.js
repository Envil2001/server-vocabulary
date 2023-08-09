const ApiError = require('../exceptions/api-error');
const tokenServce = require('../service/tokenServce');

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.UnautorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.UnautorizedError());
        }

        const userData = tokenServce.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.UnautorizedError());
        }

        req.user = userData;
        next();
    } catch (e) {
        return next(ApiError.UnautorizedError())
    }
}

