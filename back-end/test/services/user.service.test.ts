import { User } from "../../model/user";
import userDb from "../../repository/user.db";
import userService from "../../service/user.service";
import { UserInput, AuthenticationResponse } from "../../types";
import bcrypt from 'bcrypt';

let userInput: UserInput;
let user: User;

// db Mocks
let mockUserDbCreateUser: jest.SpyInstance<Promise<User | null>, [{ user: User }]>;
let mockUserDbGetUserById: jest.SpyInstance<Promise<User | null>, [{ id: number }]>;
let mockUserDbGetUserByUsername: jest.SpyInstance<Promise<User | null>, [{ username: string }]>;
let mockUserDbGetAllUser: jest.SpyInstance<Promise<User[]>>;
let mockUserDbDeleteUser: jest.SpyInstance<Promise<boolean>, [{ userId: number }]>;

beforeEach(() => {
    userInput = {
        username: '@AliceWonder',
        firstName: 'Alice',
        lastName: 'Wonder',
        email: 'alicewonder@gmail.com',
        password: 'alice123',
        role: 'user'
    };

    user = new User({
        username: '@AliceWonder',
        firstName: 'Alice',
        lastName: 'Wonder',
        email: 'alicewonder@gmail.com',
        password: 'hashedPassword',
        role: 'user'
    });

    jest.resetModules(); // Reset module registry
    // db Mocks
    mockUserDbCreateUser = jest.spyOn(userDb, 'createUser').mockResolvedValue(user);
    mockUserDbGetUserById = jest.spyOn(userDb, 'getUserById').mockResolvedValue(user);
    mockUserDbGetUserByUsername = jest.spyOn(userDb, 'getUserByUsername').mockResolvedValue(user);
    mockUserDbGetAllUser = jest.spyOn(userDb, 'getAllUser').mockResolvedValue([user]);
    mockUserDbDeleteUser = jest.spyOn(userDb, 'deleteUser').mockResolvedValue(true);
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given: a valid user, when a user is created, then a user is created with those values', async () => {
    // given
    mockUserDbGetUserByUsername.mockResolvedValue(null);
    mockUserDbCreateUser.mockResolvedValue(user);
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword' as unknown as never);

    // when
    const result: AuthenticationResponse = await userService.createUser(userInput);

    // then
    expect(mockUserDbCreateUser).toHaveBeenCalledTimes(1);
    expect(mockUserDbCreateUser).toHaveBeenCalledWith({
        user: expect.objectContaining({
            username: '@AliceWonder',
            firstName: 'Alice',
            lastName: 'Wonder',
            email: 'alicewonder@gmail.com',
            password: 'hashedPassword',
            role: 'user'
        })
    });
    expect(result).toEqual({
        token: expect.any(String),
        username: '@AliceWonder',
        fullname: 'Alice Wonder',
        role: 'user'
    });
});

test('given: an invalid userInput, when a user is created, then an error is thrown.', async () => {
    // given
    const invalidUserInput: UserInput = {
        username: 'AliceW5', // Invalid username
        firstName: 'Alice',
        lastName: 'Wonder',
        email: 'notanemail',
        password: 'alice123',
        role: 'user'
    };

    jest.spyOn(userDb, 'getUserByUsername').mockResolvedValue(null);

    // when
    const createUser = async () => await userService.createUser(invalidUserInput);

    // then
    await expect(createUser).rejects.toThrow('Invalid email format.');
});

test('given: a valid userInput but one we already have in the Db, when: we try to save a user, then: an error is thrown', async () => {
    // given
    mockUserDbGetUserByUsername.mockResolvedValue(user);

    // when
    const createUser = async () => await userService.createUser(userInput);

    // then
    await expect(createUser).rejects.toThrow('we already have a user whit username: @AliceWonder');
});

test('given: a valid userId, when: deleteUser is called, then: the user is deleted.', async () => {
    // given
    const userId: number = 1;
    mockUserDbGetUserById.mockResolvedValue(user);

    // when
    const deleteUser = userService.deleteUser({ userId: userId });

    // then
    await expect(deleteUser).resolves.not.toThrow();
});

test('given: an invalidUserId, when deleteUser is called, then: an error is thrown', async () => {
    // given
    const invalidUserId: number = -1;
    mockUserDbGetUserById.mockResolvedValue(null);

    // when
    const deleteUser = async () => await userService.deleteUser({ userId: invalidUserId });

    // then
    await expect(deleteUser).rejects.toThrow(`user with id: ${invalidUserId} does not exist.`);
});

test('given: a valid userId, when fetch user by id, then return the user', async () => {
    // given
    const userId: number = 1;
    mockUserDbGetUserById.mockResolvedValue(user);

    // when
    const result = await userService.getUserById({ userId: userId });

    // then
    expect(result).toEqual(user);
});

test('given: a valid username, when fetch user by username, then return the user', async () => {
    // given
    const username: string = '@AliceWonder';
    mockUserDbGetUserByUsername.mockResolvedValue(user);

    // when
    const result = await userService.getUserByUsername({ username: username });

    // then
    expect(result).toEqual(user);
});

test('given: a valid user, when authenticate is called, then return an authentication response', async () => {
    // given
    const validPassword: string = 'alice123';
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as unknown as never);
    mockUserDbGetUserByUsername.mockResolvedValue(user);

    // when
    const result: AuthenticationResponse = await userService.authenticate(
        userInput
    );

    // then
    expect(result).toEqual({
        token: expect.any(String),
        username: '@AliceWonder',
        fullname: 'Alice Wonder',
        role: 'user'
    });
});

test('given: an invalid password, when authenticate is called, then an error is thrown', async () => {
    // given
    const invalidPassword: string = 'wrongpassword';
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as unknown as never);
    mockUserDbGetUserByUsername.mockResolvedValue(user);

    // when
    const authenticate = async () => await userService.authenticate(
        userInput
    );

    // then
    await expect(authenticate).rejects.toThrow('Incorrect username or password.');
});