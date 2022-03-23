import { IUser } from '@typings/IUser';
import { Request, Response, NextFunction } from 'express';
import AppController, { IRoute, Methods } from '@controllers/AppController';
import UserService from '@services/UserService';
import { IResponse } from '@typings/IResponse';

class AuthenticationController extends AppController {
    public path: string = '/v1/auth';
    protected routes: Array<IRoute> = [
        {
            path: '/login',
            method: Methods.POST,
            handler: this.handleLogin,
            localMiddlewares: []
        },
        {
            path: '/register',
            method: Methods.POST,
            handler: this.handleRegister,
            localMiddlewares: []
        }
    ];

    private async handleLogin(req: Request, res: Response, next: NextFunction) {
        try {
            const user: IUser = req.body;
            const userService = new UserService(user);
            const response = await userService.login();

            if (response.isSuccess) {
                res.status(200).json(response);
            } else {
                res.status(400).json(response);
            }
        } catch (error) {
            const response: IResponse = {
                message: 'Error',
                isSuccess: false
            }

            res.status(500).json(response);
        }
    }

    private async handleRegister(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user: IUser = req.body;
            const userService = new UserService(user);
            const response = await userService.register();

            if (response.isSuccess) {
                res.status(200).json(response);
            } else {
                res.status(400).json(response);
            }
        } catch (error) {
            const response: IResponse = {
                message: 'Error',
                isSuccess: false
            }

            res.status(500).json(response);
        }
    }
}

export default AuthenticationController;