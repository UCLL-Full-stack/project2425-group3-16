/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Coach:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            user:
 *              $ref: '#/components/schemas/User'
 *            expertise:
 *              type: string
 *              description: Coach expertise.
 *            coaches:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Game'
 */

import express, { NextFunction, Request, Response } from 'express';
import coachService from '../service/coach.service'; // Replace with your actual service

const coachRouter = express.Router();

/**
 * @swagger
 * /coaches:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all coaches.
 *     responses:
 *       200:
 *         description: A list of coaches.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Coach'
 */
coachRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const coaches = await coachService.getAllCoaches();
        res.status(200).json(coaches);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /coaches/{id}:
 *  get:
 *      security:
 *         - bearerAuth: []
 *      summary: Get a coach by id.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The coach id.
 *      responses:
 *          200:
 *              description: A coach object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Coach'
 */
coachRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const coach = await coachService.getCoachById(Number(req.params.id));
        res.status(200).json(coach);
    } catch (error) {
        next(error);
    }
});

export { coachRouter };
