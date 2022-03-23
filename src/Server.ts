import { DB_CONNECTION } from '@config/secret';
import http from 'http';
import mongoose from 'mongoose';
import { Application, RequestHandler } from 'express';
import AppController from '@controllers/AppController';

class Server {
    public app: Application;
    public port: number;

    constructor(app: Application, port: number = 3000) {
        this.app = app;
        this.port = port;
    }

    public run(): http.Server {
        return this.app.listen(this.port, () => {
            console.log(`Server running on http://127.0.0.1:${this.port}`);
        });
    }

    public loadGlobalMiddlewares(globalMiddlewares: Array<RequestHandler>): void {
        for (const globalMiddleware of globalMiddlewares) {
            this.app.use(globalMiddleware);
        }
    }

    public loadControllers(controllers: Array<AppController>): void {
        for (const controller of controllers) {
            this.app.use(controller.path, controller.setRoutes());
        }
    }

    public async initialDatabase(): Promise<void> {
        try {
            await mongoose.connect(DB_CONNECTION);
            console.log('Connected to RepairRecord database');
        } catch (error) {
            console.log(error);
        }
    }
}

export default Server;