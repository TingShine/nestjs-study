/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ArgumentsHost, ExceptionFilter, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
@Injectable()
export class AllExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse()
        
        const isHttpException = exception instanceof HttpException
        const status = isHttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
        
        //@ts-ignore
        const message = !isHttpException ? (exception?.message || "") : this.handleHttpException(exception)
        Logger.error(message)
        const errorResponse = {
            code: -1,
            message
        }

        response.status(status)
        response.send(errorResponse)
    }

    handleHttpException(exception): string {
        const status = exception.getStatus()
        const response = exception.getResponse()
        const message = exception.message
        return message
    }
}