import {Game} from '../../model/game';
import database from '../../util/database';

const creatGame = async ({name, description,home, season}: Game): Promise<Game> => {
    try {
        const gamePrisma = await database.game.create({
            data: {
                name: name,
                description: description,
                home: home,
                season: season
            }
        });
        return Game.from(gamePrisma)
    } catch (e) {
        console.error(e)
        throw new Error('error in the database see log for details.')
    }
}

const getGameById = async ({gameId}: {gameId: number}): Promise<Game | null> => {
    try{
        const gamePrisma = await database.game.findUnique({
            where: {id: gameId}
        })
        return gamePrisma ? Game.from(gamePrisma) : null
    } catch (e) {
        console.error(e)
        throw new Error('error in the database see log for details.')
    }
}


export default {
    creatGame,
    getGameById
}