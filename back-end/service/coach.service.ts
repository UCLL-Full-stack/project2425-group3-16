import coachDb from '../repository/coach.db';
import { Coach } from '../model/coach';

const getAllCoaches = async (): Promise<Coach[]> => {
    return await coachDb.getAllCoaches();
};

const getCoachById = async (id: number): Promise<Coach> => {
    const coach = await coachDb.getCoachById({ id });
    if (!coach) {
        throw new Error(`Coach with id ${id} does not exist.`);
    }
    return coach;
};


export default {
    getAllCoaches,
    getCoachById,
};
