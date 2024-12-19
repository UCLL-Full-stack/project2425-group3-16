/**
 * @swagger
 * components:
 *   schemas:
 *     Appliance:
 *       type: object
 *       properties:
 *         applianceId:
 *           type: number
 *           format: int64
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         update_at:
 *           type: string
 *           format: date-time
 *     ApplianceInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 */

import express, {Request, Response, NextFunction} from "express";
import {ApplianceInput} from "../types";
import applianceService from "../service/appliance.service";

const applianceRouter = express.Router();

/**
 * @swagger
 * /appliance:
 *   post:
 *     tags:
 *       - Appliances
 *     summary: Create a new appliance
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApplianceInput'
 *     responses:
 *       201:
 *         description: The created appliance
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appliance'
 */
applianceRouter.post('/', async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const applianceInput = <ApplianceInput> req.body;
        const result = await applianceService.creatAppliance(applianceInput);
        return res.status(201).json(result);
    }catch (error){
        next(error)
    }
})

/**
 * @swagger
 * /appliance/{id}:
 *   put:
 *     tags:
 *       - Appliances
 *     summary: Update an appliance
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The appliance id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appliance'
 *     responses:
 *       200:
 *         description: The created appliance
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appliance'
 */

applianceRouter.put('/:id', async  (req: Request, res: Response, next:NextFunction)=> {
    try {
        const applianceInput = <ApplianceInput> req.body
        const applianceId: number =  Number(req.params.id)
        const result = await applianceService.updateAppliance(
            {applianceId: applianceId},
             applianceInput
        )
        return res.status(200).json(result);
    }catch (error) {
        next(error)
    }
})

/**
 * @swagger
 * /appliance:
 *   get:
 *     tags:
 *       - Appliances
 *     summary: Returns an array of all appliance's
 *     responses:
 *       200:
 *         description: The created appliance
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appliance'
 */
applianceRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const result = await applianceService.getAllAppliances()
        res.status(200).json(result);
    }catch (error){
        next((error))
    }
})


/**
 * @swagger
 * /appliance/{id}:
 *   get:
 *     tags:
 *       - Appliances
 *     summary: Returns a single appliance
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The appliance id
 *     responses:
 *       200:
 *         description: The created appliance
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appliance'
 */
applianceRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const applianceId: number = Number(req.params.id)
        const result = await applianceService.getApplianceById({applianceId: applianceId})
        return res.status(200).json(result);
    }catch (error){
        next(error)
    }
})

/**
 * @swagger
 * /appliance/{id}:
 *   delete:
 *     tags:
 *       - Appliances
 *     summary: Deletes a single appliance
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The appliance id
 *     responses:
 *       200:
 *         description: Confirmation message
 *         content:
 *           application/json:
 *             schema:
 *               message:
 *                 type: string
 */
applianceRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const applianceId: number = Number(req.params.id)
        const result = await applianceService.deleteAppliance({applianceId: applianceId})
        if(result){
            res.status(200).json({'message': `success appliance with id: ${applianceId} is deleted.`})
        }
    }catch (error){
        next(error)
    }
})

export {applianceRouter}