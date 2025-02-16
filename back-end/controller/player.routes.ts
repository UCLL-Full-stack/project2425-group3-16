/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Player:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            user:
 *              $ref: '#/components/schemas/User'
 *            playerNumber:
 *              type: string
 *              description: Player number.
 */
import express, { NextFunction, Request, Response } from 'express';
import playerService from '../service/player.service'; // Replace with your actual service

const playerRouter = express.Router();

/**
 * @swagger
 * /players:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all players.
 *     responses:
 *       200:
 *         description: A list of players.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Player'
 */
playerRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const players = await playerService.getAllPlayers();
        res.status(200).json(players);
    } catch (error) {
        next(error);
    }
});

export { playerRouter };
