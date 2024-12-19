import { User } from "../model/user";


const users: User[] = [
    new User({
        id: 1,
        username: '@AliceWonder',
        firstName: 'Alice',
        lastName: 'Wonder',
        email: 'alicewonder@gmail.com',
        password: 'alice123',
        role: 'admin',
    }),
    new User({
        id: 2,
        username: '@JohnDoe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@gmail.com',
        password: 'john123',
        role: 'user',
    })
]


const getUserById = ({ id }: { id: number }): User | null => {
    return users.find((user) => user.getUserId() === id) || null;
}

const getUserByUsername = ({ username }: { username: string }): User | null => {
    return users.find((user) => user.getUsername() === username) || null;
}


//TODO: pas aan wanneer db
const createUser = async (user: User): Promise<User | null> => {
    try {
        const existingUser = users.find((existinguser) => existinguser.getUsername() === user.getUsername())
        if (existingUser) {
            throw new Error('User with the same username already exists.')
        }
        const newUser = new User({
            username: user.getUsername(),
            password: user.getPassword(),
            firstName: user.getFirstName(),
            lastName: user.getLastName(),
            email: user.getEmail(),
            role: user.getRole()
        })
        users.push(newUser)
        return newUser
    } catch (error) {
        console.error(error)
        throw new Error('See server log for details')
    }
}

export default {
    getUserById, getUserByUsername, createUser
}