import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '@config/secret';
import { IResponse } from '@typings/IResponse';
import { Request, Response, NextFunction } from 'express';

class ValidateController {
    public static verifyToken(req: Request, res: Response, next: NextFunction): void {
        const bearer = req.headers.authorization;

        try {
            if (bearer) {
                const token = bearer.split(' ')[1];
                jwt.verify(token, SECRET_KEY);

                next();
            } else {
                throw new Error('you must provide the token');
            }
        } catch (error) {
            const response: IResponse<unknown> = {
                message: 'Unauthorized',
                isSuccess: false,
                result: error
            }

            res.status(500).json(response);
        }
    }
}

export default ValidateController;