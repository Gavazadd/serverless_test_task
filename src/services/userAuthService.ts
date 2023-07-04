import { v4 as uuidv4 } from 'uuid';
import {hash, compare} from "bcryptjs";
import {createUser, getUserByEmail} from "../database/userQueries";
import {createTokens} from "../database/tokenQueries";
import {generateTokenPair} from "../services/tokenService"
import {ApiError} from "../error";
import {TokenPairInterface} from "../interfaces/tokenPair.interface";

class UserService {
    async registration(email: string, password: string){
        const candidate = await getUserByEmail(email)
        if (candidate){
            return new ApiError("User with this email already exists", 400)
        }
        const ID:string = uuidv4();
        const hashedPassword:string =  await hash(password, 10);
        const user = await createUser(ID, email, hashedPassword)
        if (!user){
            return new ApiError("Failed to create user, try again!", 400)
        }
        const tokens = await this.writeTokensToDb(user.ID, user.email)
        return tokens
    }

    async login(email:string, password: string) {
        const user = await getUserByEmail(email)
        if (!user) {
            return new ApiError('User with this email can`t be found', 400)
        }
        const isPasswordEquals:boolean = await compare(password, user.password);
        if (!isPasswordEquals) {
            return new ApiError('Not valid password', 400);
        }
        const tokens = await this.writeTokensToDb(user.ID, user.email)
        return tokens
    }

    async writeTokensToDb (id: string, email:string)  {
        const generatedTokens:TokenPairInterface = generateTokenPair({id: id, email:email})
        const createdTokens = await createTokens(id, generatedTokens.accessToken, generatedTokens.refreshToken)
        if (!createdTokens) {
            return new ApiError('Failed to create tokens, try again!', 400);
        }
        return {"accessToken":createdTokens.accessToken, "refreshToken":createdTokens.refreshToken}
    };
}

module.exports = new UserService()