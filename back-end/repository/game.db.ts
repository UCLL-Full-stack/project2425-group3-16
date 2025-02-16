import database from '../util/database';
import { Game } from '../model/game';

/**
 * Create a new Game.
 *
 * @param {Game} game - The domain Game object to create.
 * @returns {Promise<Game>} The newly created Game, wrapped in a domain model.
 */
const createGame = async ({ name, description, home, season }: Game): Promise<Game> => {
    try {
        const gamePrisma = await database.game.create({
            data: {
                name,
                description,
                home,
                season,
            },
        });
        return Game.from(gamePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

/**
 * Find a Game by ID.
 *
 * @param {Object} params
 * @param {number} params.id - The Game ID to look up.
 * @returns {Promise<Game | null>} The found Game or null if none found.
 */
const getGameById = async ({ id }: { id: number }): Promise<Game | null> => {
    try {
        const gamePrisma = await database.game.findUnique({
            where: { id },
        });
        return gamePrisma ? Game.from(gamePrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    createGame,
    getGameById,
};
