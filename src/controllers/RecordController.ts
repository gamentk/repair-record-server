import { IRecord } from '@typings/IRecord';
import { Request, Response, NextFunction } from 'express';
import AppController, { IRoute, Methods } from '@controllers/AppController';
import ValidateController from '@controllers/ValidateController';
import RecordService from '@services/RecordService';

class RecordController extends AppController {
    public path: string = '/v1/records';
    protected routes: Array<IRoute> = [
        {
            path: '/',
            method: Methods.GET,
            handler: this.handleGetRecords,
            localMiddlewares: []
        },
        {
            path: '/:recordId',
            method: Methods.GET,
            handler: this.handleGetRecordById,
            localMiddlewares: [ValidateController.verifyToken]
        },
        {
            path: '/',
            method: Methods.POST,
            handler: this.handleCreateRecord,
            localMiddlewares: []
        },
        {
            path: '/:recordId',
            method: Methods.PUT,
            handler: this.handleUpdateRecord,
            localMiddlewares: []
        },
        {
            path: '/:recordId',
            method: Methods.DELETE,
            handler: this.handleDeleteRecord,
            localMiddlewares: []
        }
    ];

    public async handleGetRecords(req: Request, res: Response, next: NextFunction) {
        try {
            const recordService = new RecordService();
            const result = await recordService.getRecords();

            if (result.length > 0) {
                super.sendSuccess<IRecord[]>(res, result);
            } else {
                super.sendNotFound(res);
            }
        } catch (error) {
            super.sendError(res);
        }
    }

    public async handleGetRecordById(req: Request, res: Response, next: NextFunction) {
        try {
            const recordId: string = req.params.recordId;
            const recordService = new RecordService();
            const result = await recordService.getRecord(recordId);

            if (result) {
                super.sendSuccess<IRecord>(res, result);
            } else {
                super.sendNotFound(res);
            }
        } catch (error) {
            super.sendError(res);
        }
    }

    public async handleCreateRecord(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const record: IRecord = req.body;
            const recordService = new RecordService(record);
            const result = await recordService.createRecord();

            if (result) {
                super.sendCreated<IRecord>(res, result);
            } else {
                super.sendBadRequest(res);
            }
        } catch (error) {
            super.sendError(res);
        }
    }

    public async handleUpdateRecord(req: Request, res: Response, next: NextFunction) {
        try {
            const recordId: string = req.params.recordId;
            const record: IRecord = req.body;
            const recordService = new RecordService(record);
            const result = await recordService.updateRecord(recordId);

            if (result) {
                super.sendUpdated<IRecord>(res, result);
            } else {
                super.sendBadRequest(res);
            }
        } catch (error) {
            super.sendError(res);
        }
    }

    public async handleDeleteRecord(req: Request, res: Response, next: NextFunction) {
        try {
            const recordId: string = req.params.recordId;
            const recordService = new RecordService();
            const result = await recordService.deleteRecord(recordId);

            if (result) {
                super.sendDeleted(res);
            } else {
                super.sendBadRequest(res);
            }
        } catch (error) {
            super.sendError(res);
        }
    }
}

export default RecordController;