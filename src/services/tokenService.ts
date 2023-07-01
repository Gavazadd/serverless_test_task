import {sign, verify} from "jsonwebtoken";
import {TokenPairInterface} from "../interfaces/tokenPair.interface";
import {payload} from "../interfaces/payload.interface";
import {ACCESS_SECRET, REFRESH_SECRET} from "../config/config";

const generateTokenPair = (payload: payload): TokenPairInterface => {
    const accessToken: string = sign(payload, ACCESS_SECRET, {expiresIn: '1d'});
    const refreshToken: string = sign(payload, REFRESH_SECRET, {expiresIn: '7d'});
    return {accessToken, refreshToken};
};

const validateRefreshToken = (token:string) => {
    try {
        const userData = verify(token, REFRESH_SECRET)
        return userData
    } catch (e) {
        return null
    }
};



export {generateTokenPair, validateRefreshToken};