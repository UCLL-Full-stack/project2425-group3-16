/**
 * @swagger
 * components:
 *   schemas:
 *     RecipeIngredient:
 *       type: object
 *       properties:
 *         recipeIngredientId:
 *           type: number
 *           format: int64
 *         ingredient:
 *           $ref: '#/components/schemas/Ingredient'
 *         unit:
 *           type: string
 *         quantity:
 *           type: number
 *           format: int64
 *     RecipeIngredientInput:
 *       type: object
 *       properties:
 *         ingredient:
 *           $ref: '#/components/schemas/Ingredient'
 *         unit:
 *           type: string
 *         quantity:
 *           type: number
 *           format: int64
 */
import express, {Request, Response, NextFunction} from "express";
import {RecipeIngredientInput } from '../types';
import recipeIngredientService from '../service/recipeIngredient.service';

const recipeIngredientRouter = express.Router();

/**
 * @swagger
 * /recipeIngredient:
 *   post:
 *     tags:
 *       - RecipeIngredients
 *     summary: Create a new RecipeIngredient
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RecipeIngredientInput'
 *     responses:
 *       201:
 *         description: The created recipeIngredient
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecipeIngredient'
 */

recipeIngredientRouter.post('/', async (req: Request, res:Response, next: NextFunction) => {
    try{
        const recipeIngredientInput = <RecipeIngredientInput> req.body
        const result = await recipeIngredientService.createRecipeIngredient(recipeIngredientInput)
        return res.status(201).json(result)
    }catch (error){
        next(error)
    }
})


/**
 * @swagger
 * /recipeIngredient/{id}:
 *   put:
 *     tags:
 *       - RecipeIngredients
 *     summary: Update an RecipeIngredient
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The RecipeIngredient id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RecipeIngredientInput'
 *     responses:
 *       200:
 *         description: The updated RecipeIngredient
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecipeIngredient'
 */
recipeIngredientRouter.put('/:id',  async (req: Request, res: Response, next: NextFunction) => {
    try{
        const recipeIngredientId: number = Number(req.params.id)
        const recipeIngredientInput = <RecipeIngredientInput> req.body
        const result = await recipeIngredientService.updateRecipeIngredient(
            {recipeIngredientId: recipeIngredientId},
            recipeIngredientInput
        )
        return res.status(200).json(result)
    }catch (error){
        next(error)
    }
})

/**
 * @swagger
 * /recipeIngredient:
 *   get:
 *     tags:
 *       - RecipeIngredients
 *     summary: Returns an array of all recipeIngredients in the Db
 *     responses:
 *       200:
 *         description: all when well
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RecipeIngredient'
 */
recipeIngredientRouter.get('/', async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const result = await recipeIngredientService.getAllRecipeIngredients()
        return res.status(200).json(result)
    }catch (error){
        next(error)
    }
})

/**
 * @swagger
 * /recipeIngredient/{id}:
 *   get:
 *     tags:
 *       - RecipeIngredients
 *     summary: Update an RecipeIngredient
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The RecipeIngredient id
 *     responses:
 *       200:
 *         description: The requested RecipeIngredient
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecipeIngredient'
 */
recipeIngredientRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const recipeIngredientId: number = Number(req.params.id)
        const result = await recipeIngredientService.getRecipeIngredientById(
            {recipeIngredientId: recipeIngredientId}
        )
        return res.status(200).json(result)
    }catch (error){
        next(error)
    }
})

/**
 * @swagger
 * /recipeIngredient/{id}:
 *   delete:
 *     tags:
 *       - RecipeIngredients
 *     summary: Deletes a single recipeIngredient
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The recipeIngredient id
 *     responses:
 *       200:
 *         description: Confirmation message
 *         content:
 *           application/json:
 *             schema:
 *               message:
 *                 type: string
 */
recipeIngredientRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const recipeIngredientId: number = Number(req.params.id)
        await recipeIngredientService.deleteRecipeIngredient({recipeIngredientId: recipeIngredientId})
        return res.status(200).json({'message': `successfully deleted ingredient whit id: ${recipeIngredientId}`})
    }catch (error) {
        next(error)
    }
})

export {recipeIngredientRouter}