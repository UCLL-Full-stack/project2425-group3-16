/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Game:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Game name.
 *            description:
 *              type: string
 *              description: Game description.
 *            home:
 *              type: boolean
 *              description: Whether the game is a home game.
 *            season:
 *              type: number
 *              description: The season number.
 */

import express, { NextFunction, Request, Response } from 'express';
import gameService from '../service/game.service'; // Replace with your actual service

const gameRouter = express.Router();

/**
 * @swagger
 * /coaches/{id}:
 *  get:
 *      security:
 *         - bearerAuth: []
 *      summary: Get a game by id.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The game id.
 *      responses:
 *          200:
 *              description: A game object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Game'
 */
gameRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const game = await gameService.getGameById(Number(req.params.id));
        res.status(200).json(game);
    } catch (error) {
        next(error);
    }
});

export { gameRouter };
