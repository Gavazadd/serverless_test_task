import {sign} from "jsonwebtoken";
import {TokenPairInterface} from "../interfaces/tokenPair.interface";
interface payload {
    [key: string]: string;
}
const generateTokenPair = (payload: payload): TokenPairInterface => {
    const accessToken: string = sign(payload, 'ACCESS_SECRET', {expiresIn: '1d'});
    const refreshToken: string = sign(payload, 'REFRESH_SECRET', {expiresIn: '7d'});
    return {accessToken, refreshToken};
};


export {generateTokenPair};