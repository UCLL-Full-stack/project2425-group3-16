import { User } from "../model/user";
import userDb from "../repository/user.db"
import { AuthenticationResponse, UserInput } from "../types";
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../util/jwt';


const getUserById = ({ userId }: { userId: number }) => {
    const user = userDb.getUserById({ id: userId })
    if (!user) {
        throw new Error(`user with id: ${userId} does not exist.`)
    }
    return user;
}

const createUser = async ({ username, password, firstName, lastName, email, role }: UserInput): Promise<User | null> => {
    const existingUser = await userDb.getUserByUsername({ username })
    if (existingUser) {
        throw new Error(`User with username: ${username} already exists.`)
    }
    const passwordHash = await bcrypt.hash(password, 1)
    const newUser = new User({ username, password: passwordHash, firstName, lastName, email, role })
    const returnUser = await userDb.createUser(newUser);
    return returnUser;
}

const getUserByUsername = async ({ username }: { username: string }): Promise<User> => {
    const user = await userDb.getUserByUsername({ username });
    if (!user) {
        throw new Error(`User with username: ${username} does not exist.`);
    }
    return user;
};

const authenticate = async ({ username, role, password }: UserInput): Promise<AuthenticationResponse> => {
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



export default {
    getUserById, createUser, authenticate
}