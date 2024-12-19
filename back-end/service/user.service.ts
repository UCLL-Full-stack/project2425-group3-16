import userDb from "../repository/user.db"
import { UserInput } from '../types';
import {User} from '../model/user';
import bcrypt from 'bcrypt';


const creatUser = async (
    {username, firstName, lastName, email, password, role}:UserInput
): Promise<User> => {
    //check if the user already exists
    const equals = await userDb.getUserByUsername({username})
    if(equals){
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

    return await userDb.creatUser({user: newUser})
}




const getAllUser = (): User[] => {
    return  userDb.getAllUser();
}
const getUserById = ({userId}: {userId:number}) =>{
    const user = userDb.getUserById({id: userId})
    if(!user){
        throw  new Error(`user with id: ${userId} does not exist.`)
    }
    return user;
}

const deleteUser = ({userId}: {userId: number}): void => {
    getUserById({userId})
    userDb.deleteUser({userId})
}

export default {
    creatUser,
    getAllUser,
    getUserById,
    deleteUser
}