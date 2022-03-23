import express, { RequestHandler } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import Server from 'Server';

import AppController from '@controllers/AppController';
import AuthenticationController from '@controllers/AuthenticationController';
import RecordController from '@controllers/RecordController';

const globalMiddlewares: Array<RequestHandler> = [
    express.json(),
    express.urlencoded({ extended: false }),
    cors(),
    morgan('combined')
];

const controllers: Array<AppController> = [
    new AuthenticationController,
    new RecordController
];

const app = express();
const server = new Server(app, 8080);

start();

async function start(): Promise<void> {
    try {
        await server.initialDatabase();
        server.loadGlobalMiddlewares(globalMiddlewares);
        server.loadControllers(controllers);
        server.run();
    } catch (error) {
        console.log(error);
    }
}