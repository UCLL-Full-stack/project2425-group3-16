import { Role } from '../types';
import { User as UserPrisma } from '@prisma/client';

export class User {
    private userId?: number;
    private username: string;
    private firstName: string;
    private lastName: string;
    private email: string;
    private password: string;
    private role: Role;

    constructor(user: {
        id?: number;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: Role;
    }) {
        this.validate(user);

        this.userId = user.id;
        this.username = user.username;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }

    public getUserId(): number | undefined {
        return this.userId;
    }

    public getUsername(): string {
        return this.username;
    }

    public getFirstName(): string {
        return this.firstName;
    }

    public getLastName(): string {
        return this.lastName;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPassword(): string {
        return this.password;
    }

    public getRole(): Role {
        return this.role;
    }

    public equal(user: User): boolean {
        return (
            this.username === user.getUsername() &&
            this.firstName === user.getFirstName() &&
            this.lastName === user.getLastName() &&
            this.email === user.getEmail() &&
            this.password === user.getPassword() &&
            this.role === user.getRole()
        );
    }

    private validate(user: {
        id?: number;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: Role;
    }): void {
        if (user.id !== undefined && user.id < 0) {
            throw new Error('The id of an object cannot be negative, this is not a valid object.');
        }
        if (!user.username?.trim()) {
            throw new Error('Username cannot be empty.');
        }
        if (!user.firstName?.trim()) {
            throw new Error('First name cannot be empty.');
        }
        if (!user.lastName?.trim()) {
            throw new Error('Last name cannot be empty.');
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(user.email)) {
            throw new Error('Invalid email format.');
        }
        const passwordRegex = /^.{2,}$/;
        if (!passwordRegex.test(user.password)) {
            throw new Error('Password must be at least 2 characters long.');
        }
        const validRoles: Role[] = ['admin', 'chef', 'user'];
        if (!validRoles.includes(user.role)) {
            throw new Error(`Role must be one of the following: ${validRoles.join(', ')}`);
        }
    }

    static from({ id, username, firstName, lastName, email, password, role }: UserPrisma): User {
        return new User({
            id,
            username,
            firstName,
            lastName,
            email,
            password,
            role
        });
    }
}