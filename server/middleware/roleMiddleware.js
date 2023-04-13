const tokenService = require('../service/tokenService');
const ApiError = require('./apiError');

module.exports = function(role){
    return function(req,res,next){
        try {
            const token = req.headers.authorization.split(" ")[1];
            if(!token){
                return next(ApiError.UnauthorizedError());
            }
            const {role: userRole} =  tokenService.validateAccessToken(token);
            if (!userRole) {
                return next(ApiError.UnauthorizedError());
            }
            if (userRole != 'ADMIN') {
                return next(ApiError.BadRole());
            }
            req.user = userRole;
            next();
        } catch (e) {
            return next(ApiError.UnauthorizedError());
        }
    }
}