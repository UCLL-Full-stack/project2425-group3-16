import { User } from '../../model/user';
import { Role } from '../../types';

let id: number | undefined;
let username: string;
let firstName: string;
let lastName: string;
let email: string;
let password: string;
let role: Role;

beforeEach(() => {
    id = undefined;
    username = '@BobHope';
    firstName = 'Bob';
    lastName = 'Hope';
    email = 'bobhope@gmail.com';
    password = 'bob123';
    role = 'user';
});

test(`given: valid values for user, when: user is created, then: user is created with those values`, () => {
    // when
    const user: User = new User({ id, username, firstName, lastName, email, password, role });

    // then
    expect(user.getUserId()).toBe(id);
    expect(user.getUsername()).toBe(username);
    expect(user.getFirstName()).toBe(firstName);
    expect(user.getLastName()).toBe(lastName);
    expect(user.getEmail()).toBe(email);
    expect(user.getPassword()).toBe(password);
    expect(user.getRole()).toBe(role);
});

test(`given: two equal users, when: the user.equals method is called, then: the method will return true`, () => {
    // given
    const user1 = new User({ id, username, firstName, lastName, email, password, role });

    // when
    const isEqual = user1.equal(user1);

    // then
    expect(isEqual).toBe(true);
});

test(`given: two different users, when: the user.equals method is called, then: the method will return false`, () => {
    // given
    const user1 = new User({ id, username, firstName, lastName, email, password, role });
    const user2 = new User({
        id,
        username: '@DifferentUser',
        firstName,
        lastName,
        email,
        password,
        role,
    });

    // when
    const isEqual = user1.equal(user2);

    // then
    expect(isEqual).toBe(false);
});

test('given: invalid values (Bad Id) for user, when: user is created, then: an error is thrown.', () => {
    // given
    const invalidId: number = -1;

    // when
    const user = () => new User({ id: invalidId, username, firstName, lastName, email, password, role });

    // then
    expect(user).toThrow('The id of an object cannot be negative, this is not a valid object.');
});

test('given: invalid values (bad username) for user, when: user is created, then: an error is thrown.', () => {
    // given
    const invalidUsername: string = "  ";

    // when
    const user = () => new User({ id, username: invalidUsername, firstName, lastName, email, password, role });

    // then
    expect(user).toThrow('Username cannot be empty.');
});

test('given: invalid values (bad first name) for user, when: user is created, then: an error is thrown.', () => {
    // given
    const invalidFirstName: string = "  ";

    // when
    const user = () => new User({ id, username, firstName: invalidFirstName, lastName, email, password, role });

    // then
    expect(user).toThrow('First name cannot be empty.');
});

test('given: invalid values (bad last name) for user, when: user is created, then: an error is thrown.', () => {
    // given
    const invalidLastName: string = "  ";

    // when
    const user = () => new User({ id, username, firstName, lastName: invalidLastName, email, password, role });

    // then
    expect(user).toThrow('Last name cannot be empty.');
});

test('given: invalid values (bad email) for user, when: user is created, then: an error is thrown.', () => {
    // given
    const invalidEmail: string = "invalidEmail";

    // when
    const user = () => new User({ id, username, firstName, lastName, email: invalidEmail, password, role });

    // then
    expect(user).toThrow('Invalid email format.');
});

test('given: invalid values (bad password) for user, when: user is created, then: an error is thrown.', () => {
    // given
    const invalidPassword: string = "a";

    // when
    const user = () => new User({ id, username, firstName, lastName, email, password: invalidPassword, role });

    // then
    expect(user).toThrow('Password must be at least 2 characters long.');
});

test('given: invalid values (bad role) for user, when: user is created, then: an error is thrown.', () => {
    // given
    const invalidRole: Role = 'invalidRole' as Role;

    // when
    const user = () => new User({ id, username, firstName, lastName, email, password, role: invalidRole });

    // then
    expect(user).toThrow('Role must be one of the following: admin, chef, user');
});