import { User } from './user';
import { DomainError } from '../util/errors/DemainError';
import { Player as playerPrisma, User as userPrisma } from '@prisma/client';

export class Player {
    private id?: number;
    private user: User;
    private createdAt: Date;
    private updateAt: Date;
    private playerNumber: string;

    constructor(player: {
        id?: number;
        user: User;
        createdAt: Date;
        updateAt: Date;
        playerNumber: string;
    }) {
        Player.validate(player);

        this.id = player.id;
        this.user = player.user;
        this.createdAt = player.createdAt;
        this.updateAt = player.updateAt;
        this.playerNumber = player.playerNumber;
    }

    getId(): number | undefined {
        return this.id;
    }

    getUser(): User {
        return this.user;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getUpdatedAt(): Date {
        return this.updateAt;
    }

    getPlayerNumber(): string {
        return this.playerNumber;
    }

    equals(player: Player): boolean {
        return (
            this.user.equals(player.getUser()) &&
            this.createdAt === player.getCreatedAt() &&
            this.updateAt === player.getUpdatedAt() &&
            this.playerNumber === player.getPlayerNumber()
        );
    }


    private static validate(props: {
        user: User;
        createdAt: Date;
        updateAt: Date;
        playerNumber: string;
    }) {
        if (!props.playerNumber?.trim()) {
            throw new DomainError('Player validation: "playerNumber" is required.');
        }
    }


    static from(
        { id, user, createdAt, updatedAt, playerNumber
        }: playerPrisma & { user: userPrisma }): Player {
        return new Player({
            id,
            user: User.from(user),
            createdAt,
            updateAt: updatedAt,
            playerNumber,
        });
    }
}
