import { IResponse } from '@typings/IResponse';
import { Request, Response, NextFunction, Router } from 'express';

export enum Methods {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete'
}

export type ExpressRouteHandler = (req: Request, res: Response, next: NextFunction) => void | Promise<void>;

export interface IRoute {
    path: string;
    method: Methods;
    handler: ExpressRouteHandler;
    localMiddlewares: Array<ExpressRouteHandler>;
}

abstract class AppController {
    public router: Router = Router();
    public abstract path: string;
    protected abstract readonly routes: Array<IRoute>;

    public setRoutes(): Router {
        for (const route of this.routes) {
            for (const middleware of route.localMiddlewares) {
                this.router.use(route.path, middleware);
            }

            this.router[route.method](route.path, route.handler);
        }

        return this.router
    }

    public sendSuccess<T>(res: Response, result?: T) {
        const response: IResponse<T> = {
            message: 'Success',
            isSuccess: true,
            result
        };

        res.status(200).json(response);
    }

    public sendError(res: Response) {
        const response: IResponse = {
            message: 'Error',
            isSuccess: false
        };

        res.status(500).json(response);
    }

    public sendBadRequest(res: Response) {
        const response: IResponse = {
            message: 'Bad Request',
            isSuccess: false
        };

        res.status(400).json(response);
    }

    public sendNotFound(res: Response) {
        const response: IResponse = {
            message: 'Not Found',
            isSuccess: false
        };

        res.status(404).json(response);
    }

    public sendUnauthorized(res: Response) {
        const response: IResponse = {
            message: 'Unauthorized',
            isSuccess: false
        };

        res.status(401).json(response);
    }

    public sendCreated<T>(res: Response, result?: T) {
        const response: IResponse = {
            message: 'Created',
            isSuccess: true,
            result
        };

        res.status(200).json(response);
    }

    public sendUpdated<T>(res: Response, result?: T) {
        const response: IResponse<T> = {
            message: 'Updated',
            isSuccess: true,
            result
        }

        res.status(200).json(response);
    }

    public sendDeleted(res: Response) {
        const response: IResponse = {
            message: 'Deleted',
            isSuccess: true
        };

        res.status(200).json(response);
    }
}

export default AppController;