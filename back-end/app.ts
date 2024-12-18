import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import {applianceRouter} from "./controller/appliance.routes";
import {tagRouter} from "./controller/tag.routes";
import {userRouter} from "./controller/user.routes";
import { ingredientRouter } from './controller/Ingredient.routes';
import { recipeIngredientRouter } from './controller/recipeIngredient.routes';

const app = express();
dotenv.config();
const port: string | 3000 = process.env.APP_PORT || 3000;

app.use(cors({ origin: 'http://localhost:8080' }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.info(`Request: ${req.method} at: ${req.url}`);
    next();
});

app.use('/appliance', applianceRouter);
app.use('/tag', tagRouter);
app.use('/user', userRouter)
app.use('/ingredient', ingredientRouter)
app.use('/recipeIngredient', recipeIngredientRouter)

app.get('/status', (req, res) => {
    res.json({ message: 'Courses API is running...' });
});

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Recipe API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ status: 'unauthorized', message: err.message });
    } else if (err.name === 'CoursesError') {
        res.status(400).json({ status: 'domain error', message: err.message });
    } else {
        res.status(400).json({ status: 'application error', message: err.message });
    }
});

app.listen(port || 3000, () => {
    console.log(`Courses API is running on port ${port}.`);
});
