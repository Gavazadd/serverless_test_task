import {JwtPayload, sign, verify} from "jsonwebtoken";
import {TokenPairInterface} from "../interfaces/tokenPair.interface";
import {payload} from "../interfaces/payload.interface";
import {ACCESS_SECRET, REFRESH_SECRET} from "../config/config";
import {ApiError} from "../error";

const generateTokenPair = (payload: payload): TokenPairInterface => {
    const accessToken: string = sign(payload, ACCESS_SECRET, {expiresIn: '1d'});
    const refreshToken: string = sign(payload, REFRESH_SECRET, {expiresIn: '7d'});
    return {accessToken, refreshToken};
};

const validateRefreshToken = (token:string) => {
    try {
        const userData: string|JwtPayload = verify(token, REFRESH_SECRET)
        return userData
    } catch (e) {
        return  new ApiError('Not valid token', 401);
    }
};



export {generateTokenPair, validateRefreshToken};