const jwt = require('jsonwebtoken');
const refreshModel = require('../models/refresh.model');
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload,accessTokenSecret,{
            expiresIn: '45s'
        });

        const refreshToken = jwt.sign(payload,refreshTokenSecret,{
            expiresIn: '1y'
        });

        return { accessToken, refreshToken };
    }

    async storeRefreshTokenInDb(token, userId){
        try{    
            await refreshModel.create({
                token,
                userId,
            })

        }catch(error){
            console.log(error.message);
        }
    }

    async verifyAccessToken(accessToken){
        return jwt.verify(accessToken,accessTokenSecret);
    }

    async verifyRefreshToken(refreshToken){
        return jwt.verify(refreshToken,refreshTokenSecret);
    }

    async findRefreshToken(userId,refreshToken){
        console.log(userId);
        return await refreshModel.findOne({
            userId : userId,
            token : refreshToken,
        })
    }

    async updateRefreshToken(userId,refreshToken){
        return await refreshModel.updateOne({ userId : userId},{token : refreshToken});
    }

    async removeTokenFromDB(refreshToken){
        return await refreshModel.deleteOne({ token : refreshToken });
    }
}

module.exports = new TokenService();