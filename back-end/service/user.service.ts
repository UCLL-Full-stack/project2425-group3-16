import {User} from '../model/user';
import { AuthenticationResponse, UserInput } from '../types';
import userDb from '../repository/user.db';
import assert from 'node:assert';
import bcrypt from 'bcrypt';
import { generateJWTToken } from '../util/jwt'


const creatUser = async (
    {username, firstName, lastName, email, password, role}:UserInput
): Promise<User| null> => {
    const existingUser = await userDb.getUserByUsername({username})
    if(existingUser){
        throw new Error('we already have this user.')
    }

    const hasedPassword: string = await bcrypt.hash(password, 12)

    const user: User = new User({
        username, firstName, lastName, email, password: hasedPassword, role
    })

    return await userDb.creatUser({user})
}

const authenticate = async ({username, password}:UserInput): Promise<AuthenticationResponse> => {
    const user: User = await getUserByUsername({username})

    const isValidPassword = await  bcrypt.compare(password, user.getPassword())
    if(!isValidPassword){
        throw  new Error(`username or password is invalid.`)
    }

    return {
        token: generateJWTToken({
            username,
            role: user.getRole()
        }),
        username: username,
        role: user.getRole(),
        fullname: `${user.getFirstName()} ${user.getLastName()}`
    }

}

const getAllUsers = async (): Promise<User[]> => {
    return userDb.getAllUser()
}


const getUserByUsername = async ({username}: {username: string}): Promise<User| null> => {
    const user = await userDb.getUserByUsername({username})
    if(!user){
        throw new Error('we can find the user')
    }
    return user;
}

export default {creatUser, authenticate, getAllUsers}