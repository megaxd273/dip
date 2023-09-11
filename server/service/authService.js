const {User,Profile} = require('../models/Models');
const bcrypt = require('bcrypt');
const tokenService = require('./tokenService');
const ApiError = require('../middleware/apiError')
const UserDto = require('../dtos/userDto');

module.exports = new class UserService{
    async registration(login, password, profileData){
        const candidate = await User.findOne({ where: { login } });
        if(candidate){
            throw ApiError.BadRequest(`User with ${login} already exists`);
        }
        const hashedPassword = await bcrypt.hash(password, 3);
        
        const user = await User.create({ login, password: hashedPassword });
        await Profile.create({
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            middleName: profileData.middleName,
            userId: user.id
          });

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    }
    async login(login, password){
        const user = await User.findOne({ where: { login } });
        if (!user) {
            throw ApiError.badRequestError("пользователь с такой почтой не найден");
        }
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) {
            throw ApiError.badRequestError("Неверный пароль");
        }
        // if (password!= user.password) {
        //     throw ApiError.badRequestError("Неверный пароль");
        // }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    }
    async logout(refreshToken){
        if(!refreshToken){
            console.log("token undefined");
        }
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }
    async refresh(token){
        if (!token) {
            throw ApiError.unauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(token);
        const dbToken = tokenService.findToken(token);
        if (!userData || !dbToken) {
            throw ApiError.unauthorizedError();
        }
        const user = await User.findByPk(userData.id)
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    }
    async getUsers(){
        const users = await User.findAll({
            attributes:['id','login', 'password', 'role'],
            include: {
                model: Profile,
                attributes: ['firstName', 'lastName', 'middleName']
              }
        });
        return users;
    }
}