import { ICommonSchema } from '@typings/ICommonSchema';

export interface IUser extends ICommonSchema {
    userId: string;
    username: string;
    password?: string;
    firstName: string;
    lastName: string;
}