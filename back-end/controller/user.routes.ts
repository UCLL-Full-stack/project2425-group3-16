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
 *           type: string
 *           description: Role of the user (e.g., 'admin', 'user', etc.)
 */

import express from "express";
import userService from "../service/user.service";
import { UserInput } from "../types";
import { Request, Response, NextFunction } from "express";


const userRoutes = express.Router()

/**
 * @swagger
 * /users/signup:
 *  post:
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
 *                          $ref: '#/components/schemas/User'
 */
userRoutes.post(
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
 * /users/login:
 *  post:
 *      summary: Log a User in
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/AuthenticationRequest'
 *      responses:
 *          200:
 *              description: logged in user object
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AuthenticationRequest'
 */
userRoutes.post(
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

export { userRoutes }