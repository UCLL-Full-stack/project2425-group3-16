import { Game } from './game';
import { Coach } from './coach';
import { Player } from './player';
import { DomainError } from '../util/errors/DemainError';

import {
    Schedule as schedulePrism,
    Coach as coachPrisma,
    Game as gamePrisma,
    User as userPrisma,
    Player as playerPrisma,
} from '@prisma/client';

export class Schedule {
    readonly id?: number;
    readonly start: Date;
    readonly end: Date;
    readonly game: Game;
    readonly coach: Coach;
    readonly players: Player[];
    readonly createdAt?: Date;
    readonly updatedAt?: Date;

    constructor(schedule: {
        id?: number;
        start: Date;
        end: Date;
        game: Game;
        coach: Coach;
        players: Player[];
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        Schedule.validate(schedule);

        this.id = schedule.id;
        this.start = schedule.start;
        this.end = schedule.end;
        this.game = schedule.game;
        this.coach = schedule.coach;
        this.players = schedule.players;
        this.createdAt = schedule.createdAt;
        this.updatedAt = schedule.updatedAt;
    }

    addPlayerToSchedule(player: Player) {
        if (!this.players.includes(player)) {
            this.players.push(player);
        }
    }


    equals(schedule: Schedule): boolean {
        return (
            this.start === schedule.start &&
            this.end === schedule.end &&
            this.game.equals(schedule.game) &&
            this.coach.equals(schedule.coach) &&
            this.players.every((player, index) => player.equals(schedule.players[index])) &&
            this.createdAt === schedule.createdAt &&
            this.updatedAt === schedule.updatedAt
        );
    }

    /**
     * Validation logic for constructing a Schedule:
     * - start & end are required
     * - start < end
     * - game is required
     * - coach is required
     */
    private static validate(props: {
        start: Date;
        end: Date;
        game: Game;
        coach: Coach;
        players?: Player[];
    }) {
        if (!props.start || !props.end) {
            throw new DomainError('Schedule validation: "start" and "end" date are required.');
        }
        if (props.start > props.end) {
            throw new DomainError('Schedule validation: Start date cannot be after end date.');
        }
        if (!props.game) {
            throw new DomainError('Schedule validation: "game" is required.');
        }
        if (!props.coach) {
            throw new DomainError('Schedule validation: "coach" is required.');
        }
    }


    static from({
                    id,
                    start,
                    end,
                    game,
                    coach,
                    players,
                    createdAt,
                    updatedAt,
                }: schedulePrism & {
        coach: coachPrisma & { user: userPrisma; games: gamePrisma[] };
        game: gamePrisma;
        players: (playerPrisma & { user: userPrisma })[];
    }): Schedule {
        return new Schedule({
            id,
            start,
            end,
            game: Game.from(game),
            coach: Coach.from(coach),
            players: players.map((p) => Player.from(p)),
            createdAt,
            updatedAt,
        });
    }
}
