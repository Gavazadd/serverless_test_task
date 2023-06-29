import dynamodb from "./db";
import {USERTABLENAME} from "../config/config";

const createUser = async (id: string, email: string, password: string) => {
     await dynamodb.put({
        TableName: USERTABLENAME,
        Item: {
            ID: id,
            email: email,
            password: password
        }
    });
    const createdUser = await getUserByEmail(email)
    return createdUser
};

// const getUserById = async (id: string) => {
//     const { Item } = await dynamodb.get({
//         TableName: USERTABLENAME,
//         Key: {
//             "ID": id
//         }
//     });
//     return Item;
// };

const getUserByEmail = async (email: string) => {
    const { Item } = await dynamodb.get({
        TableName: USERTABLENAME,
        Key: {
            "email": email
        }
    });
    return Item;
};

export { createUser, getUserByEmail};
