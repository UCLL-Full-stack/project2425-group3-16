/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         userId:
 *           type: number
 *           format: int64
 *         username:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *         role:
 *           $ref: '#/components/schemas/Role'
 *     UserInput:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *         role:
 *           $ref: '#/components/schemas/Role'
 *     Role:
 *       type: string
 *       enum: [admin, chef, user]
 *     AuthenticationRequest:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 *     AuthenticationResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *         username:
 *           type: string
 *         fullname:
 *           type: string
 *         role:
 *           type: string
 */

import express, { NextFunction, Request, Response } from "express";
import { UserInput } from '../types';
import userService from '../service/user.service';

const userRouter = express.Router()

/**
 * @swagger
 * /user:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: The created user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body
        const result = await userService.createUser(userInput)
        res.status(201).json(result)
    } catch (error) {
        next(error)
    }
})

/**
 * @swagger
 * /user:
 *   get:
 *     tags:
 *       - Users
 *     summary: Returns an array of all users
 *     responses:
 *       200:
 *         description: Returns an array of all users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userService.getAllUser()
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
})

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Returns a single user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user id
 *     responses:
 *       200:
 *         description: The created user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId: number = Number(req.params.id)
        const result = await userService.getUserById({ userId })
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
})

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Deletes a single user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user id
 *     responses:
 *       200:
 *         description: Confirmation message
 *         content:
 *           application/json:
 *             schema:
 *               message:
 *                 type: string
 */
userRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId: number = Number(req.params.id)
        await userService.deleteUser({ userId })
        res.status(204).json({ message: `User with id: ${userId} deleted` })
    } catch (error) {
        next(error)
    }
})

/**
 * @swagger
 * /user/signup:
 *  post:
 *      tags:
 *      - Authentication
 *      summary: Create a new User
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserInput'
 *      responses:
 *          200:
 *              description: created user object
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AuthenticationResponse'
 */
userRouter.post(
    '/signup',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userInput: UserInput = req.body;
            const actualUser = await userService.createUser(userInput);
            res.status(200).json(actualUser);
        } catch (error) {
            next(error);
        }
    }
)


/**
 * @swagger
 * /user/login:
 *   post:
 *     tags:
 *     - Authentication
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
userRouter.post(
    '/login',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userInput: UserInput = req.body;
            const response = await userService.authenticate(userInput);
            res.status(200).json({ message: "Authentication succesfull", ...response });
        } catch (error) {
            next(error)
        }
    }
)

export { userRouter }