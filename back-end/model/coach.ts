import { User } from './user';
import { Game } from './game';
import { DomainError } from '../util/errors/DemainError';
import { Coach as coachPrisma, User as userPrisma, Game as gamePrisma } from '@prisma/client';

export class Coach {
    readonly id?: number;
    readonly user: User;
    readonly expertise: string;
    readonly games: Game[];
    readonly createdAt?: Date;
    readonly updatedAt?: Date;

    constructor(coach: {
        id?: number;
        user: User;
        expertise: string;
        games: Game[];
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        Coach.validate(coach);

        this.id = coach.id;
        this.user = coach.user;
        this.expertise = coach.expertise;
        this.games = coach.games;
        this.createdAt = coach.createdAt;
        this.updatedAt = coach.updatedAt;
    }

    equals(coach: Coach): boolean {
        return (
            this.user.equals(coach.user) &&
            this.expertise === coach.expertise &&
            this.games.every((game, index) => game.equals(coach.games[index])) &&
            this.createdAt === coach.createdAt &&
            this.updatedAt === coach.updatedAt
        );
    }

    private static validate(props: {
        user: User;
        expertise: string;
        games?: Game[];
    }) {
        if (!props.expertise?.trim()) {
            throw new DomainError('Coach validation: "expertise" is required.');
        }
    }

    static from({
                    id,
                    user,
                    expertise,
                    games,
                    createdAt,
                    updatedAt,
                }: coachPrisma & { user: userPrisma; games: gamePrisma[] }): Coach {
        return new Coach({
            id,
            user: User.from(user),
            expertise,
            games: games.map((g) => Game.from(g)),
            createdAt,
            updatedAt,
        });
    }
}
