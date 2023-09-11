const userService = require("../service/authService");
const {validationResult} = require('express-validator');
const ApiError = require('../middleware/apiError');

module.exports = new class AuthController{
    // async registration(req,res,next){
    //     try {
    //         const errors = validationResult(req);
    //         if(!errors.isEmpty()){
    //             return next(ApiError.BadRequest('ошибка при валидации', errors.array()));
    //         }
    //         const {login, password, firstName, lastName, middleName} = req.body;
    //         const userData = await userService.registration(login, password, {firstName, lastName, middleName});
    //         res.cookie('refreshToken', userData.refreshToken, {maxAge: 30* 24 * 60 * 60 * 1000, httpOnly: true});
    //         return res.json(userData);
    //     } catch (e) {
    //         next(e);
    //     }
    // }
    async login(req,res,next){
        try {
            const {login, password} = req.body;
            const userData = await userService.login(login, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30* 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async logout(req,res,next){
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            console.log(e);
            next(e);
        }
    }
    async refresh(req,res,next){
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30* 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async getUsers(req,res,next){
        try {
            const users = await userService.getUsers();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }
}