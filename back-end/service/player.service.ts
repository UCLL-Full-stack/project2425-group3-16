import playerDb from '../repository/player.db';
import { Player } from '../model/player';

const getAllPlayers = async (): Promise<Player[]> => {
    return await playerDb.getAllPlayers();
};

const getPlayerById = async (id: number): Promise<Player> => {
    const player = await playerDb.getPlayerById({ id });
    if (!player) {
        throw new Error(`Player with id ${id} does not exist.`);
    }
    return player;
};

export default {
    getAllPlayers,
    getPlayerById,
};
