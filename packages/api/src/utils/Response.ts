import { Response } from 'express';
// TODO: we can add global error handler but it is later on also it would
// change format type they want in json lets skip it for now
export class ResponseUtil {
    static sendResponse<T>(
        res: Response,
        data: T,
        message: string,
        pagination: any = null,
        statusCode = 200
    ): Response<T> {
        return res.status(statusCode).json({
            success: true,
            message,
            data,
            pagination
        })
    }

    static sendError<T>(
        res: Response,
        message: string,
        statusCode = 500,
        error: T,
    ): Response<T> {
        return res.status(statusCode).json({
            success: false,
            message,
            data,
        })
    }
}
