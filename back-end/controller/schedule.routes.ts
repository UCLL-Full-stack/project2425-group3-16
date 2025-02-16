/**
 * @swagger
 *   components:
 *    schemas:
 *      Schedule:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            start:
 *              type: string
 *              format: date-time
 *            end:
 *              type: string
 *              format: date-time
 *            game:
 *              $ref: '#/components/schemas/Game'
 *            coach:
 *              $ref: '#/components/schemas/Coach'
 *            players:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Player'
 *      ScheduleInput:
 *          type: object
 *          properties:
 *            start:
 *              type: string
 *              format: date-time
 *            end:
 *              type: string
 *              format: date-time
 *            game:
 *              type: object
 *              properties:
 *                  id:
 *                      type: number
 *                      format: int64
 *            coach:
 *              type: object
 *              properties:
 *                  id:
 *                      type: number
 *                      format: int64
 *      EnrollmentInput:
 *          type: object
 *          properties:
 *              schedule:
 *                type: object
 *                properties:
 *                    id:
 *                      type: number
 *                      format: int64
 *              players:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                         id:
 *                            type: number
 *                            format: int64
 */

import express, { NextFunction, Request, Response } from 'express';
import scheduleService from '../service/schedule.service'; // Replace with your actual service
import { EnrollmentInput, Role, ScheduleInput } from '../types';

const scheduleRouter = express.Router();

/**
 * @swagger
 * /schedules:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get the schedule of a coach or, if the user is an admin, a list of all schedules.
 *     responses:
 *       200:
 *         description: The schedule for a specific coach or a list of all schedules if admin.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Schedule'
 */
scheduleRouter.get(
    '/',
    async (req: Request & { auth?: { username: string; role: Role } }, res: Response, next: NextFunction) => {
        try {
            const { username, role } = req.auth || {};
            const schedules = await scheduleService.getSchedule({ username }, { role });
            res.status(200).json(schedules);
        } catch (error) {
            next(error);
        }
    }
);

/**
 * @swagger
 * /schedules:
 *   post:
 *      security:
 *       - bearerAuth: []
 *      summary: Create a new schedule for an existing coach and game.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ScheduleInput'
 *      responses:
 *         200:
 *            description: The created schedule.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Schedule'
 */
scheduleRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const schedule = req.body as ScheduleInput;
        const result = await scheduleService.createSchedule(schedule);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /schedules/enroll:
 *   post:
 *      security:
 *       - bearerAuth: []
 *      summary: Enroll players to a schedule.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/EnrollmentInput'
 *      responses:
 *         200:
 *            description: The schedule with all players enrolled.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Schedule'
 */
scheduleRouter.post('/enroll', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const schedule = req.body as EnrollmentInput;
        const result = await scheduleService.addPlayersToSchedule(schedule);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

export { scheduleRouter };
