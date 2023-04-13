const User = require('../sequelize/models/Models');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const tokenService = require('./tokenService');
const ApiError = require('../middleware/apiError')
const UserDto = require('../dtos/userDto');

module.exports = new class UserService{
    async registration(email, password){
        const candidate = await User.findOne({ where: { email } });
        if(candidate){
            throw ApiError.BadRequest(`User with ${email} already exists`);
        }
        const hashedPassword = await bcrypt.hash(password, 3);
        
        const user = await User.create({email, password: hashedPassword});

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    }
    async login(email, password){
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw ApiError.BadRequest("пользователь с такой почтой не найден");
        }
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) {
            throw ApiError.BadRequest("Неверный пароль");
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    }
    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }
    async refresh(token){
        if (!token) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(token);
        const dbToken = tokenService.findToken(token);
        if (!userData || !dbToken) {
            throw ApiError.UnauthorizedError();
        }
    }
    async getUsers(){
        const users = await User.findAll({
            attributes:['id','email', 'password', 'role']
        });
        return users;
    }
}