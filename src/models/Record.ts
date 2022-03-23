import { Schema, model } from 'mongoose';
import { IRecord } from '@typings/IRecord';

const RecordSchema = new Schema<IRecord>({
    recordId: { type: String, required: true },
    recordNo: { type: Number, required: true },
    repairDate: { type: Date, default: Date.now },
    section: { type: String, required: true },
    deviceName: { type: String, required: true },
    deviceSerialNumber: { type: String },
    deviceAccessories: { type: String },
    sender: { type: String, required: true },
    reciever: { type: String, required: true },
    recieveDate: { type: Date },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const RecordModel = model<IRecord>('Record', RecordSchema);

export default RecordModel;