import dynamodb from "./db";

const tableName: string = "users";

const createUser = async (id: string, email: string, password: string) => {
     await dynamodb.put({
        TableName: tableName,
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
//         TableName: tableName,
//         Key: {
//             "ID": id
//         }
//     });
//     return Item;
// };

const getUserByEmail = async (email: string) => {
    const { Item } = await dynamodb.get({
        TableName: tableName,
        Key: {
            "email": email
        }
    });
    return Item;
};

export { createUser, getUserByEmail};
