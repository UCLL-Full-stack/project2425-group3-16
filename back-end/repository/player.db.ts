import { Player } from '../model/player';
import database from '../util/database';


const creatPlayer = async ({ player }: { player: Player }): Promise<Player> => {
    try {
        const user = player.getUser();
        const playerPrisma = await database.player.create({
            data: {
                createdAt: player.getCreatedAt(),
                updatedAt: player.getUpdatedAt(),
                playerNumber: player.getPlayerNumber(),
                user: {
                    create: {
                        id: user.getId(),
                        username: user.getUsername(),
                        firstName: user.getLastName(),
                        lastName: user.getLastName(),
                        email: user.getEmail(),
                        password: user.getPassword(),
                        role: user.getRole()
                    }
                }
            },
            include: { user: true }
        });
        return Player.from(playerPrisma);
    } catch (error) {
        console.error(error);
        throw new error('something when wrong in the db have a look in the logs for details ');
    }
};


const getPlayerById = async ({ id }: { id: number }): Promise<Player | null> => {
    try {
        const playerPrisma = await database.player.findUnique({
            where: { id: id },
            include: { user: true }
        });
        return playerPrisma ? Player.from(playerPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new error('something when wrong in the db have a look in the logs for details ');
    }
};

const getAllPlayers = async (): Promise<Player[]> => {
    try {
        const playerPrisms = await database.player.findMany({
            include: { user: true }
        });
        return playerPrisms.map(p => Player.from(p));
    } catch (error) {
        console.error(error);
        throw new error('something when wrong in the db have a look in the logs for details ');
    }
};

export default {
    creatPlayer,
    getPlayerById,
    getAllPlayers
};