export type ResponseMessageType = 'Success' | 'Created' | 'Updated' | 'Deleted' | 'Not Found' | 'Error' | 'Bad Request' | 'Unauthorized' | 'Incorrected';

export interface IResponse<T = {}> {
    message: ResponseMessageType;
    isSuccess: boolean;
    result?: T | Array<T>
}