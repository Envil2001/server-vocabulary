module.exports = class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnautorizedError() {
        return new ApiError(401, 'Пользователь не авторизован')
    }
    static BadRequest(status, message, errors = []) {
        return new ApiError(status, message, errors);
    }
}