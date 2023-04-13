const tokenService = require('../service/tokenService');
const ApiError = require('./apiError');


module.exports = function(req, res, next){
    try {
        const token = req.headers.authorization.split(" ")[1];
        if(!token){
            return next(ApiError.UnauthorizedError());
        }
        const userData =  tokenService.validateAccessToken(token);
        if (!userData) {
            return next(ApiError.UnauthorizedError());
        }
        req.user = userData;
        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
}