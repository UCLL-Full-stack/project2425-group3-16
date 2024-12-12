import { Role } from '../types';

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

    getRole(): Role {
        return this.role;
    }

    equal(user: User): boolean {
        return (
            this.username === user.getUsername() &&
            this.firstName === user.getFirstName() &&
            this.lastName === user.getLastName() &&
            this.email === user.getEmail() &&
            this.password === user.getPassword() &&
            this.role === user.getRole()
        );
    }
}
