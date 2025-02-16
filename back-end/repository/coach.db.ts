import { Coach } from '../model/coach';
import database from '../util/database';

const creatCoach = async ({ user, expertise, games }: Coach): Promise<Coach> => {
    try {
        const coachPrisma = await database.coach.create({
            data: {
                expertise: expertise,
                user: {
                    create: {
                        username: user.getUsername(),
                        password: user.getPassword(),
                        firstName: user.getFirstName(),
                        lastName: user.getLastName(),
                        email: user.getEmail(),
                        role: user.getRole()
                    }
                },
                games: {
                    connect: games.map((game) => ({ id: game.id }))
                }
            },
            include: {
                user: true,
                games: true
            }
        });
        return Coach.from(coachPrisma);
    } catch (e) {
        console.error(e);
        throw new Error('something when wrong in the database');
    }
};

const getCoachById = async ({ id }: { id: number }): Promise<Coach | null> => {
    try {
        const coachPrisma = await database.coach.findUnique({
            where: { id: id },
            include: {
                user: true,
                games: true
            }
        });
        return coachPrisma ? Coach.from(coachPrisma) : null;
    } catch (e) {
        console.error(e);
        throw new Error('something when wrong in the database');
    }
};

const getAllCoaches = async  (): Promise<Coach[]> => {
    try{
        const coachPrisma = await database.coach.findMany({
            include: {
                user: true,
                games: true
            }})
        return coachPrisma.map(c => Coach.from(c))
    } catch (e) {
        console.error(e);
        throw new Error('something when wrong in the database');
    }
}

export default {
    creatCoach,
    getCoachById,
    getAllCoaches
}