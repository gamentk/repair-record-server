import { Schema, model } from 'mongoose';
import { IUser } from '@typings/IUser';

const UserSchema = new Schema<IUser>({
    userId: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const UserModel = model<IUser>('User', UserSchema);

export default UserModel;