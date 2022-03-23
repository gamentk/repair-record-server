import { ICommonSchema } from '@typings/ICommonSchema';

export interface IRecord extends ICommonSchema {
    recordId: string;
    recordNo: number;
    repairDate: Date;
    section: string;
    deviceName: string;
    deviceSerialNumber: string;
    deviceAccessories: string;
    sender: string;
    reciever: string;
    recieveDate: Date;
    description: string;
}