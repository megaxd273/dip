const jwt = require('jsonwebtoken');
const User = require('../sequelize/models/Models');

module.exports = new class TokenService{
    generateTokens(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn:'24h'
        });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: '30d'
        });

        return {
            accessToken,
            refreshToken
        }
    }
    validateAccessToken(token){
        try {
            const userData = jwt.verify(token,process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (error) {
            return null;
        }
    }
    validateRefreshToken(token){
        try {
            const userData = jwt.verify(token,process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (error) {
            return null;
        }
    }
    async saveToken(userId, token){
        await User.update({refreshToken: token},{
            where:{
                id: userId
            }
        });
    }
    async findToken(token){
        const tokenData = await User.findOne({where:{refreshToken: token}});
        return tokenData;
    }
    async removeToken(token){
        const tokenData = await User.update({refreshToken: ''},{
            where:{
                refreshToken: token
            }
        });
        return tokenData;
    }
}