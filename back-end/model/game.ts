import { DomainError } from '../util/errors/DemainError';
import { Game as gamePrisma } from '@prisma/client';

export class Game {
    readonly id?: number;
    readonly name: string;
    readonly description: string;
    readonly home: boolean;
    readonly season: number;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;

    constructor(game: {
        id?: number;
        name: string;
        description: string;
        home: boolean;
        season: number;
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        Game.validate(game);

        this.id = game.id;
        this.name = game.name;
        this.description = game.description;
        this.home = game.home;
        this.season = game.season;
        this.createdAt = game.createdAt;
        this.updatedAt = game.updatedAt;
    }

    equals(game: Game): boolean {
        return (
            this.name === game.name &&
            this.description === game.description &&
            this.home === game.home &&
            this.season === game.season &&
            this.createdAt === game.createdAt &&
            this.updatedAt === game.updatedAt
        );
    }

    /**
     * Validate essential fields
     */
    private static validate(props: {
        name: string;
        description: string;
        home: boolean;
        season: number;
    }) {
        if (!props.name?.trim()) {
            throw new DomainError('Game validation: "name" is required.');
        }
        if (props.season < 0) {
            throw new DomainError('Game validation: "season" must be a positive integer.');
        }
    }

    static from({ id, name, description, home, season, createdAt, updatedAt }: gamePrisma): Game {
        return new Game({
            id,
            name,
            description,
            home,
            season,
            createdAt,
            updatedAt,
        });
    }
}
