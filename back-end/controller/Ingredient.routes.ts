/**
 * @swagger
 * components:
 *   schemas:
 *     Ingredient:
 *       type: object
 *       properties:
 *         ingredientId:
 *           type: number
 *           format: int64
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         caloriesPerUnit:
 *           type: number
 *           format: int64
 *         fatPerUnit:
 *           type: number
 *           format: int64
 *         carbsPerUnit:
 *           type: number
 *           format: int64
 *         proteinPerUnit:
 *           type: number
 *           format: int64
 *     IngredientInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         caloriesPerUnit:
 *           type: number
 *           format: int64
 *         fatPerUnit:
 *           type: number
 *           format: int64
 *         carbsPerUnit:
 *           type: number
 *           format: int64
 *         proteinPerUnit:
 *           type: number
 *           format: int64
 */
import express, {Request, Response, NextFunction} from "express";
import { IngredientsInput } from '../types';
import ingredientService from "../service/Ingredient.service"

const ingredientRouter = express.Router();

/**
 * @swagger
 * /ingredient:
 *   post:
 *     tags:
 *       - Ingredients
 *     summary: Create a new ingredient
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IngredientInput'
 *     responses:
 *       201:
 *         description: The created appliance
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 */

ingredientRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ingredientInput = <IngredientsInput> req.body
        const result = await ingredientService.creatIngredient(ingredientInput);
        return res.status(201).json(result)
    }catch (error){
        next(error)
    }
})

/**
 * @swagger
 * /ingredient/{id}:
 *   put:
 *     tags:
 *       - Ingredients
 *     summary: Update an Ingredient
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The Ingredient id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IngredientInput'
 *     responses:
 *       200:
 *         description: The updated Ingredient
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 */
ingredientRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const ingredientId: number = Number(req.params.id)
        const ingredientInput = <IngredientsInput> req.body
        const result = await ingredientService.updateIngredient(
            {ingredientId: ingredientId},
            ingredientInput
        )
        return res.status(200).json(result)
    }catch (error){
        next(error)
    }
})

/**
 * @swagger
 * /ingredient:
 *   get:
 *     tags:
 *       - Ingredients
 *     summary: Returns an array of all ingredients in the Db
 *     responses:
 *       200:
 *         description: all when well
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ingredient'
 */
ingredientRouter.get('/', async  (req: Request, res: Response, next: NextFunction) => {
    try{
        const result = await ingredientService.getAllIngredients()
        res.status(200).json(result)
    }catch (error) {
        next(error)
    }
})

/**
 * @swagger
 * /ingredient/{id}:
 *   get:
 *     tags:
 *       - Ingredients
 *     summary: gets an Ingredient by the id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The Ingredient id
 *     responses:
 *       200:
 *         description: The requested Ingredient
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 */
ingredientRouter.get('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try{
        const ingredientId: number = Number(req.params.id)
        const result = await ingredientService.getIngredientById({ingredientId: ingredientId})
        return res.status(200).json(result)
    }catch (error) {
        next(error)
    }
})

/**
 * @swagger
 * /ingredient/{id}:
 *   delete:
 *     tags:
 *       - Ingredients
 *     summary: Deletes a single ingredient
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ingredient id
 *     responses:
 *       200:
 *         description: Confirmation message
 *         content:
 *           application/json:
 *             schema:
 *               message:
 *                 type: string
 */
ingredientRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const ingredientId: number = Number(req.params.id)
         await ingredientService.deleteIngredient({ingredientId: ingredientId})
        return res.status(200).json({'message': `successfully deleted ingredient whit id: ${ingredientId}`})
    }catch (error) {
        next(error)
    }
})

export {ingredientRouter}