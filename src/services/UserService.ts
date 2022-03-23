import { SECRET_KEY } from '@config/secret';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from '@typings/IUser';
import UserModel from '@models/User';
import { IResponse } from '@typings/IResponse';

interface ISafeUser {
    user: IUser;
    token: string;
}

class UserService {
    private readonly username: string;
    private readonly password: string;
    private readonly firstName: string;
    private readonly lastName: string;

    constructor(user: IUser) {
        this.username = user.username;
        this.password = user.password!;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
    }

    public async login(): Promise<IResponse<ISafeUser>> {
        try {
            const existUser = await UserModel.findOne({ username: this.username }).exec();

            if (existUser) {
                const isPasswordEqual = await bcrypt.compare(this.password, existUser.password!);
                const signedToken = jwt.sign({ userId: existUser.userId }, SECRET_KEY, { expiresIn: '7d' });

                if (isPasswordEqual) {
                    return {
                        message: 'Success',
                        isSuccess: true,
                        result: {
                            user: {
                                userId: existUser.userId,
                                username: existUser.username,
                                firstName: existUser.firstName,
                                lastName: existUser.lastName
                            },
                            token: signedToken
                        }
                    }
                } else {
                    return {
                        message: 'Incorrected',
                        isSuccess: false
                    }
                }
            } else {
                return {
                    message: 'Not Found',
                    isSuccess: false
                }
            }
        } catch (error) {
            throw error;
        }
    }

    public async register(): Promise<IResponse<IUser>> {
        try {
            const existUser = await UserModel.findOne({ username: this.username }).exec();

            if (existUser) {
                return {
                    message: 'Bad Request',
                    isSuccess: false
                };
            }

            const hashedPassword = await bcrypt.hash(this.password, 10);
            const user = new UserModel({
                userId: uuidv4(),
                username: this.username,
                password: hashedPassword,
                firstName: this.firstName,
                lastName: this.lastName
            });
            const savedUser = await user.save();

            return {
                message: 'Success',
                isSuccess: true,
                result: {
                    userId: savedUser.userId,
                    username: savedUser.username,
                    firstName: savedUser.firstName,
                    lastName: savedUser.lastName
                }
            };
        } catch (error) {
            throw error;
        }
    }
}

export default UserService;