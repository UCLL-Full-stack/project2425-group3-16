/**
 * @swagger
 * components:
 *   schemas:
 *     Tag:
 *       type: object
 *       properties:
 *         tagId:
 *           type: number
 *           format: int64
 *         name:
 *           type: string
 *         description:
 *           type: string
 *     TagInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 */

import express, {NextFunction, Request, Response} from "express";
import {TagInput} from '../types';
import tagServerice from '../service/tag.serverice';

const tagRouter = express.Router();

/**
 * @swagger
 * /tag:
 *   post:
 *     tags:
 *       - Tag
 *     summary: Post a new Tag.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TagInput'
 *     responses:
 *       200:
 *         description: The created Tag
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 errorMessage:
 *                   type: string
 */
tagRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const tagInput = <TagInput>req.body
        const result = await tagServerice.createTag(tagInput)
        return res.status(201).json(result)
    }catch (error){
        next(error)
    }
})

/**
 * @swagger
 * /tag/{id}:
 *   put:
 *     tags:
 *       - Tag
 *     summary: Update a Tag
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The Tag id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tag'
 *     responses:
 *       200:
 *         description: The updated Tag
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 */
tagRouter.put('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const tagInput = <TagInput>req.body
        const tagId: number = Number(req.params.id)
        const result = await tagServerice.updateTag(
            {tagId: tagId},
            tagInput
        )
        return res.status(200).json(result)
    }catch (error){
        next(error)
    }
})

/**
 * @swagger
 * /tag/{id}:
 *   get:
 *     tags:
 *       - Tag
 *     summary: Retrieve a tag by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The tag ID
 *     responses:
 *       200:
 *         description: A recipe object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 */
tagRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const tagInput = <TagInput>req.body
        const tagId: number = Number(req.params.id)
        const result = await tagServerice.updateTag(
            {tagId: tagId},
            tagInput
        )
        return res.status(200).json(result)
    }catch (error){
        next(error)
    }
})

/**
 * @swagger
 * /tag:
 *   get:
 *     tags:
 *       - Tag
 *     summary: Retrieve a list of all Tag.
 *     responses:
 *       200:
 *         description: A list of Tags.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tag'
 */
tagRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await tagServerice.getAllTags()
        return res.status(200).json(result)
    }catch (error){
        next(error)
    }
})

/**
 * @swagger
 * /tag/{id}:
 *   get:
 *     tags:
 *       - Tag
 *     summary: Returns a single Tag
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The tag id
 *     responses:
 *       200:
 *         description: The requested Tag
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 */
tagRouter.get('/:id', async(req: Request, res: Response, next: NextFunction) => {
    try{
        const tagId: number = Number(req.params.id)
        const result = await tagServerice.getTagById({tagId: tagId})
        return res.status(200).json(result)
    }catch (error){
        next(error)
    }
})

/**
 * @swagger
 * /tag/{id}:
 *   delete:
 *     tags:
 *       - Tag
 *     summary: Deletes a single Tag
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The Tag id
 *     responses:
 *       200:
 *         description: Confirmation message
 *         content:
 *           application/json:
 *             schema:
 *               message:
 *                 type: string
 */
tagRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const tagId: number = Number(req.params.id)
        await tagServerice.deleteTag({tagId: tagId})
        return res.status(200).json({'message':`we successfully deleted tag with id: ${tagId}`})
    }catch (error){
        next(error)
    }
})
export {tagRouter}