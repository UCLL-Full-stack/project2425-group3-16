import userDb from "../repository/user.db"
import { UserInput } from '../types';
import {User} from '../model/user';


const creatUser = (
    {username, firstName, lastName, email, password, role}:UserInput
): User => {
    const newUser: User = new User({
        username,
        firstName,
        lastName,
        email,
        password,
        role
    })
    const equals = userDb.getUserByUsername({username})
    if(equals){
        throw new Error(`we already have a user whit username: ${username}`)
    }

    const users: User[] = getAllUser();
    users.forEach((u) => {
        const equals: boolean = u.equal(newUser);
        if(equals){
            throw new Error(`we can't save this user`);
        }
    });
    return userDb.creatUser({user: newUser})
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