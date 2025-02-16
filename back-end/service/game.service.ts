
import gameDb from '../repository/game.db';
import { Game } from '../model/game';

const getGameById = async (id: number): Promise<Game> => {
    const game = await gameDb.getGameById({ id });
    if (!game) {
        throw new Error(`Game with id ${id} does not exist.`);
    }
    return game;
};

export default { getGameById };
