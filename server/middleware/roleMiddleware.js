const tokenService = require('../service/tokenService');
const ApiError = require('./apiError');

module.exports = function (role) {
    return function (req, res, next) {
        try {
            const header = req.headers.authorization;
            if(!header){
                return next(ApiError.unauthorizedError());
            }
            const token = req.headers.authorization.split(" ")[1];
            if (!token) {
                return next(ApiError.unauthorizedError());
            }
            const userData = tokenService.validateAccessToken(token);
            if (!userData) {
                return next(ApiError.unauthorizedError());
            }
            if (userData.role != role) {
                return next(ApiError.badRequestError());
            }
            req.user = userData;
            next();
        } catch (e) {
            return next(ApiError.internalServerError());
        }
    }
}