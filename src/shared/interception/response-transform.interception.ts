import {
    Injectable,
    NestInterceptor,
    CallHandler,
    ExecutionContext,
  } from '@nestjs/common';
  import { map } from 'rxjs/operators';
  import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { XML_KEY } from '../decorators/xml.decorator';
  interface Response<T> {
    data: T;
  }
  @Injectable()
  export class ResponseTransformInterceptor<T>
    implements NestInterceptor<T, Response<T>> {

    private reflector: Reflector = new Reflector()

    intercept(
      context: ExecutionContext,
      next: CallHandler<T>,
    ): Observable<Response<T>> | Observable<any> {
      const isXml = this.reflector.getAllAndOverride<boolean>(XML_KEY, [
        context.getHandler(), context.getClass()
      ]) || false

      if(isXml) {
        return next.handle().pipe(
          map(data => {
            return data
          }),
        );
      }
      
      
      return next.handle().pipe(
        map(data => {
          return {
            data,
            code: 200,
            message: 'Success',
          };
        }),
      );
    }
  }