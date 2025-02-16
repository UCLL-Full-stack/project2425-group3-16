import { User } from '../model/user';
import database from '../util/database';

const creatUser = async ({ user }: { user: User }): Promise<User | null> => {
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
        return User.from(userPrisma) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const updateUser = async (
    { userId, user }: { userId: number, user: User }): Promise<User | null> => {
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
        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAllUser = async (): Promise<User[]> => {
    try {
        const userPrisma = await database.user.findMany();
        return userPrisma.map(u => User.from(u));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserById = async ({ userId }: { userId: number }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { id: userId }
        });
        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserByUsername = async ({ username }: { username: string }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { username: username }
        });
        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const deleteUser = async ({ userId }: { userId: number }): Promise<boolean> => {
    try {
        const userPrisma = await database.user.delete({
            where: { id: userId }
        });
        return !!userPrisma;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    creatUser,
    updateUser,
    getAllUser,
    getUserById,
    getUserByUsername,
    deleteUser
}