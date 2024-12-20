import { User } from '../model/user';
import database from './database';

const createUser = async ({ user }: { user: User }): Promise<User> => {
    try {
        const userPrisma = await database.user.create({
            data: {
                username: user.getUsername(),
                firstName: user.getFirstName(),
                lastName: user.getLastName(),
                email: user.getEmail(),
                password: user.getPassword(),
                role: user.getRole()
            }
        });
        return User.from(userPrisma);
    } catch (error) {
        console.log(error)
        throw new Error('Something went wrong in the database see server logs for details');
    }
}

const updateUser = async (
    { userId }: { userId: number },
    { user }: { user: User }
): Promise<User | null> => {
    try {
        const userPrisma = await database.user.update({
            where: { id: userId },
            data: {
                username: user.getUsername(),
                firstName: user.getFirstName(),
                lastName: user.getLastName(),
                email: user.getEmail(),
                password: user.getPassword(),
                role: user.getRole()
            }
        });
        return User.from(userPrisma);
    } catch (error) {
        console.log(error)
        throw new Error('Something went wrong in the database see server logs for details');
    }
}

const getAllUser = async (): Promise<User[]> => {
    const usersPrisma = await database.user.findMany();
    return usersPrisma.map(u => User.from(u));
}

const getUserById = async ({ id }: { id: number }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { id: id }
        })
        return userPrisma ? User.from(userPrisma) : null
    } catch (error) {
        console.log(error)
        throw new Error('Something went wrong in the database see server logs for details');
    }
}


const getUserByUsername = async ({ username }: { username: string }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { username: username }
        })
        return userPrisma ? User.from(userPrisma) : null
    } catch (error) {
        console.log(error)
        throw new Error('Something went wrong in the database see server logs for details');
    }
}

const deleteUser = async ({ userId }: { userId: number }): Promise<boolean> => {
    try {
        const result = await database.user.delete({
            where: { id: userId }
        });
        return !!result;
    } catch (error) {
        console.log(error)
        throw new Error('Something went wrong in the database see server logs for details');
    }
}

export default {
    createUser,
    updateUser,
    getAllUser,
    getUserById,
    getUserByUsername,
    deleteUser
}