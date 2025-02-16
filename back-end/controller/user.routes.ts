/**
 * @swagger
 *   components:
 *     schemas:
 *       User:
 *         type: object
 *         properties:
 *           id:
 *             type: number
 *             format: int64
 *           username:
 *             type: string
 *             description: Username.
 *           password:
 *             type: string
 *             description: User password.
 *           firstName:
 *             type: string
 *             description: First name.
 *           lastName:
 *             type: string
 *             description: Last name.
 *           email:
 *             type: string
 *             description: E-mail.
 *           role:
 *             $ref: '#/components/schemas/Role'
 *       UserInput:
 *         type: object
 *         properties:
 *           username:
 *             type: string
 *             description: Username.
 *           password:
 *             type: string
 *             description: User password.
 *           firstName:
 *             type: string
 *             description: First name.
 *           lastName:
 *             type: string
 *             description: Last name.
 *           email:
 *             type: string
 *             description: E-mail.
 *           role:
 *             $ref: '#/components/schemas/Role'
 *       Role:
 *         type: string
 *         enum: [student, lecturer, admin, guest]
 *       AuthenticationRequest:
 *         type: object
 *         properties:
 *           username:
 *             type: string
 *           password:
 *             type: string
 *       AuthenticationResponse:
 *         type: object
 *         properties:
 *           message:
 *             type: string
 *           token:
 *             type: string
 *           username:
 *             type: string
 *           fullname:
 *             type: string
 */
import  Express, {Request, Response, NextFunction}  from "express";
import userService from '../service/user.service';
import { UserInput } from '../types';

const userRoutes = Express.Router();


/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: error
 */
userRoutes.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const result = await userService.creatUser(userInput);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User can login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthenticationRequest'
 *     responses:
 *       200:
 *         description: The created user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthenticationResponse'
 */

userRoutes.post('/login', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body
        const result = await userService.authenticate(userInput);
        return res.status(200).json({message: 'Authentication successful', ...result})
    } catch (error) {
        next()
    }
})

/**
 * @swagger
 * /users:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all users
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/User'
 */
userRoutes.get(
    '/',
    async (req: Request & { auth: UserInput }, res: Response, next: NextFunction) => {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }
);

export { userRoutes };
