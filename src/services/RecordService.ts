import { v4 as uuidv4 } from 'uuid';
import { IRecord } from '@typings/IRecord';
import RecordModel from '@models/Record';

class RecordService {
    private readonly record: IRecord | undefined;

    constructor(record?: IRecord) {
        this.record = record;
    }

    public async getRecords(): Promise<IRecord[]> {
        try {
            const records = await RecordModel.find().exec();

            return records;
        } catch (error) {
            return [];
        }
    }

    public async getRecord(recordId: string): Promise<IRecord | null> {
        try {
            const record = await RecordModel.findOne({ recordId });

            return record;
        } catch (error) {
            return null
        }
    }

    public async createRecord(): Promise<IRecord | null> {
        try {
            const record = new RecordModel({
                recordId: uuidv4(),
                ...this.record
            });
            const savedRecord = await record.save();

            return savedRecord;
        } catch (error) {
            return null;
        }
    }

    public async updateRecord(recordId: string): Promise<IRecord | null> {
        try {
            if (this.record) {
                const result = await RecordModel.updateOne({ recordId }, this.record);

                if (result.modifiedCount) {
                    return this.record;
                } else {
                    return null;
                }
            } else {
                throw new Error;
            }
        } catch (error) {
            return null;
        }
    }

    public async deleteRecord(recordId: string): Promise<string | null> {
        try {
            const result = await RecordModel.deleteOne({ recordId });

            if (result.deletedCount) {
                return recordId
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }
}

export default RecordService;