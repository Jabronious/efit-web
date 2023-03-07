import { CallHandler, ExecutionContext } from '@nestjs/common';
import { of, throwError } from 'rxjs';
import { ErrorResponseInterceptorInterceptor } from './error-response-interceptor.interceptor';

describe('ErrorResponseInterceptorInterceptor', () => {
  let interceptor: ErrorResponseInterceptorInterceptor;
  let mockNext: CallHandler;
  let expectedResponse = { errors: 'test' };
  let handleFuncMock: jest.Mock;

  beforeEach(() => {
    handleFuncMock = jest.fn();
    interceptor = new ErrorResponseInterceptorInterceptor();
    mockNext = {
      handle: () => throwError(() => new Error('test')),
    } as CallHandler;
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  it('should return the observable returned by next.handle if it succeeds', async () => {
    const context: ExecutionContext = {} as ExecutionContext;
    const result = await interceptor.intercept(context, mockNext).toPromise();
    expect(result).toEqual(expectedResponse);
  });
});
