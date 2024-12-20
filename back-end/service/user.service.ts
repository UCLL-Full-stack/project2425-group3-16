import { User } from "../model/user";
import userDb from "../repository/user.db"
import { AuthenticationResponse, UserInput } from '../types';
import bcrypt from 'bcrypt';
import { generateJwtToken } from "../util/jwt";
import assert from 'node:assert';


const createUser = async (
    { username, firstName, lastName, email, password, role }: UserInput
): Promise<AuthenticationResponse> => {
    //check if the user already exists
    const equals = await userDb.getUserByUsername({ username })
    if (equals) {
        throw new Error(`we already have a user whit username: ${username}`)
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    //create a new user so we valid the input
    const newUser: User = new User({
        username,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role
    });

    const result = await userDb.createUser({ user: newUser })
    assert(result !== null, `something went wrong in the database.`)

    const token = generateJwtToken({ username: username, role });

    return {
        token: token,
        username: username,
        fullname: `${result.getFirstName()} ${result.getLastName()}`,
        role: role
    };

}

const authenticate = async (
    { username, role, password }: UserInput
): Promise<AuthenticationResponse> => {

    const user = await getUserByUsername({ username });
    if (!user) {
        throw new Error('Incorrect username or password.')
    }
    const isValidPassword = await bcrypt.compare(password, user.getPassword());
    if (!isValidPassword) {
        throw new Error('Incorrect username or password.');
    }
    const token = generateJwtToken({ username: username, role });
    return {
        token: token,
        username: username,
        fullname: `${user.getFirstName()} ${user.getLastName()}`,
        role: role
    };
};

const getAllUser = async (): Promise<User[]> => {
    return await userDb.getAllUser();
}

const getUserById = async (
    { userId }: { userId: number }
) => {
    const user = await userDb.getUserById({ id: userId })
    if (!user) {
        throw new Error(`user with id: ${userId} does not exist.`)
    }
    return user;
}

const getUserByUsername = async (
    { username }: { username: string }
): Promise<User> => {
    const user = await userDb.getUserByUsername({ username });
    if (!user) {
        throw new Error(`User with username: ${username} does not exist.`);
    }
    return user;
};

const deleteUser = async (
    { userId }: { userId: number }
): Promise<void> => {
    await getUserById({ userId })
    await userDb.deleteUser({ userId })
}

export default {
    createUser,
    getAllUser,
    getUserById,
    getUserByUsername,
    deleteUser,
    authenticate
}