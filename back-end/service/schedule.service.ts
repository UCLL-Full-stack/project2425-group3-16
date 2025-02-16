// src/service/schedule.service.ts
import scheduleDb from '../repository/schedule.db';
import gameDb from '../repository/game.db';
import coachDb from '../repository/coach.db';
import playerDb from '../repository/player.db';

import { Schedule } from '../model/schedule';
import { Role, ScheduleInput, PlayerInput } from '../types';

/**
 * Returns schedules based on the user role:
 * - Admin sees all schedules
 * - Coach sees only their own schedules
 * - Otherwise, throws an error
 */
const getSchedule = async (
    { username }: { username: string },
    { role }: { role: Role }
): Promise<Schedule[]> => {
    switch (role) {
        case 'admin':
            return await scheduleDb.getAllSchedules();
        case 'coach':
            return await scheduleDb.getScheduleForCoach({ username });
        default:
            throw new Error('You are not authorized to perform this action.');
    }
};

const createSchedule = async (
    { start, end, game: gameInput, coach: coachInput }: ScheduleInput): Promise<Schedule> => {

    const game = await gameDb.getGameById({ id: gameInput.id });
    if (!game) throw new Error('Game not found');


    const coach = await coachDb.getCoachById({ id: coachInput.id });
    if (!coach) throw new Error('Coach not found');

    const schedule = new Schedule({
        start,
        end,
        game,
        coach,
        players: []
    });
    return await scheduleDb.createSchedule(schedule);
};


const addPlayersToSchedule = async (
    { schedule: scheduleInput, players: playersInput }:
    { schedule: ScheduleInput; players: PlayerInput[]; }
): Promise<Schedule> => {
    if (!playersInput.length) {
        throw new Error('At least one player is required');
    }

    const schedule = await scheduleDb.getScheduleById({ id: scheduleInput.id });
    if (!schedule) {
        throw new Error('Schedule not found');
    }

    const players = await Promise.all(
        playersInput.map(async (playerInput) => {
            const player = await playerDb.getPlayerById({ id: playerInput.id });
            if (!player) {
                throw new Error(`Player with id ${playerInput.id} not found.`);
            }
            return player;
        })
    );

    players.forEach((player) => {
        schedule.addPlayerToSchedule(player);
    });

    return await scheduleDb.updatePlayersOfSchedule({ schedule });
};

export default {
    getSchedule,
    createSchedule,
    addPlayersToSchedule
};
