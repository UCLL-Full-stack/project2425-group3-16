import {User} from "../model/user";


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

const creatUser = ({user}: {user: User}): User => {
    const newUser: User = new User({
        id: users.length + 1,
        username: user.getUsername(),
        firstName: user.getFirstName(),
        lastName: user.getLastName(),
        email: user.getEmail(),
        password: user.getPassword(),
        role: user.getRole()
    })
    users.push(newUser)
    return newUser
}

const updateUser = (
    {userId}: {userId: number},
    {user}: {user: User}
): User | null =>{
    const oldUser: User | null = getUserById({id: userId})
    if(oldUser == null){return  null}
    const newUser: User = new User({
        id: oldUser?.getUserId(),
        username: user.getUsername(),
        firstName: user.getFirstName(),
        lastName: user.getLastName(),
        email: user.getEmail(),
        password: user.getPassword(),
        role: user.getRole()
    })

    const index: number = users.findIndex(u => u.getUserId() === userId)
    if(index == -1){return  null}
    users[index] = newUser
    return newUser
}

const getAllUser = (): User[] => {
    return users
}

const getUserById = ({id}: { id: number }): User | null => {
    return users.find((user) => user.getUserId() === id) || null;
}

const getUserByUsername = ({username}: {username: string}): User | null => {
    return users.find((user) => user.getUsername() === username) || null
}

const deleteUser = ({userId}: {userId: number}): void | null => {
    const index = users.findIndex(u => u.getUserId() === userId)
    if(index == -1){return  null}
    users.splice(index, 1)
}

export default {
    creatUser,
    updateUser,
    getAllUser,
    getUserById,
    getUserByUsername,
    deleteUser
}