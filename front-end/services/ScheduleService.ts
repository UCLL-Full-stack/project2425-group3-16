import { Schedule, Player } from "@types";

/**
 * Fetches all schedules.
 * If your schedules endpoint requires authentication,
 * add the Bearer token to the headers.
 */
const getSchedules = () => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/schedules`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

/**
 * Enroll a single player in a schedule.
 */
const enrollPlayer = (schedule: Schedule, player: Player) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/schedules/enroll`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            schedule,
            players: [player],
        }),
    });
};

/**
 * Create a new schedule for a given Game and Coach.
 */
const createSchedule = (schedule: Schedule) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/schedules`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(schedule),
    });
};

const ScheduleService = {
    getSchedules,
    enrollPlayer,
    createSchedule,
};

export default ScheduleService;
