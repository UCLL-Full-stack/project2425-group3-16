import database from '../util/database';
import { Schedule } from '../model/schedule';

/**
 * Creates a new Schedule for a given Game and Coach.
 *
 * @param {Schedule} schedule - A domain Schedule object
 * @returns {Promise<Schedule>} The newly created Schedule
 */
const createSchedule = async ({ start, end, game, coach, players }: Schedule): Promise<Schedule> => {
    try {
        const schedulePrisma = await database.schedule.create({
            data: {
                start,
                end,
                game: {
                    connect: { id: game.id },
                },
                coach: {
                    connect: { id: coach.id },
                },
                // You can optionally connect players here if you want to create them at once:
                // players: {
                //   connect: players.map((p) => ({ id: p.getId() })),
                // },
            },
            include: {
                game: true,
                coach: { include: { user: true, games: true } },
                players: { include: { user: true } },
            },
        });
        return Schedule.from(schedulePrisma);
    } catch (e) {
        console.error(e);
        throw new Error('Database error. See server log for details.');
    }
};

/**
 * Updates a schedule by adding (connecting) multiple Players.
 *
 * @param {Schedule} schedule - A domain Schedule containing updated players
 * @returns {Promise<Schedule | null>} The updated Schedule, or null if not found
 */
const updatePlayersOfSchedule = async ({ schedule }: { schedule: Schedule }): Promise<Schedule | null> => {
    try {
        const schedulePrisma = await database.schedule.update({
            where: { id: schedule.id },
            data: {
                players: {
                    connect: schedule.players.map((player) => ({ id: player.getId() })),
                },
            },
            include: {
                game: true,
                coach: { include: { user: true, games: true } },
                players: { include: { user: true } },
            },
        });
        return schedulePrisma ? Schedule.from(schedulePrisma) : null;
    } catch (e) {
        console.error(e);
        throw new Error('Database error. See server log for details.');
    }
};

/**
 * Returns all schedules in the database.
 */
const getAllSchedules = async (): Promise<Schedule[]> => {
    try {
        const schedulesPrisma = await database.schedule.findMany({
            include: {
                game: true,
                coach: { include: { user: true, games: true } },
                players: { include: { user: true } },
            },
        });
        return schedulesPrisma.map((s) => Schedule.from(s));
    } catch (e) {
        console.error(e);
        throw new Error('Database error. See server log for details.');
    }
};

/**
 * Returns schedules for a Coach (by matching the Coach's username).
 */
const getScheduleForCoach = async ({ username }: { username: string }): Promise<Schedule[]> => {
    try {
        const schedulesPrisma = await database.schedule.findMany({
            where: {
                coach: {
                    user: { username },
                },
            },
            include: {
                game: true,
                coach: { include: { user: true, games: true } },
                players: { include: { user: true } },
            },
        });
        return schedulesPrisma.map((s) => Schedule.from(s));
    } catch (e) {
        console.error(e);
        throw new Error('Database error. See server log for details.');
    }
};

/**
 * Finds a single schedule by its ID.
 */
const getScheduleById = async ({ id }: { id: number }): Promise<Schedule | null> => {
    try {
        const schedulePrisma = await database.schedule.findUnique({
            where: { id },
            include: {
                game: true,
                coach: { include: { user: true, games: true } },
                players: { include: { user: true } },
            },
        });
        return schedulePrisma ? Schedule.from(schedulePrisma) : null;
    } catch (e) {
        console.error(e);
        throw new Error('Database error. See server log for details.');
    }
};

/**
 * Finds schedules by matching both a Game ID and a Coach ID.
 */
const getScheduleByGameAndCoach = async ({
                                             gameId,
                                             coachId,
                                         }: {
    gameId: number;
    coachId: number;
}): Promise<Schedule | null> => {
    try {
        const schedulePrisma = await database.schedule.findFirst({
            where: {
                gameId,
                coachId,
            },
            include: {
                game: true,
                coach: { include: { user: true, games: true } },
                players: { include: { user: true } },
            },
        });
        return schedulePrisma ? Schedule.from(schedulePrisma) : null;
    } catch (e) {
        console.error(e);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    createSchedule,
    updatePlayersOfSchedule,
    getAllSchedules,
    getScheduleForCoach,
    getScheduleById,
    getScheduleByGameAndCoach,
};
