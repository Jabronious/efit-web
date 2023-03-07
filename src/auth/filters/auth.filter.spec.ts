import {
  ArgumentsHost,
  HttpException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthFilter } from './auth.filter';

describe('AuthFilter', () => {
  let filter: AuthFilter;
  let mockResponse: Response;
  let mockArgumentsHost: ArgumentsHost;

  beforeEach(() => {
    filter = new AuthFilter();
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      redirect: jest.fn(),
    } as any;
    mockArgumentsHost = {
      switchToHttp: jest.fn().mockReturnThis(),
      getResponse: jest.fn().mockReturnValue(mockResponse),
    } as any;
  });

  it('should redirect to /auth/discord for UnauthorizedException', () => {
    const mockException = new UnauthorizedException();
    filter.catch(mockException, mockArgumentsHost);
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.redirect).toHaveBeenCalledWith('/auth/discord');
  });

  it('should redirect to /auth/discord for ForbiddenException', () => {
    const mockException = new ForbiddenException();
    filter.catch(mockException, mockArgumentsHost);
    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockResponse.redirect).toHaveBeenCalledWith('/auth/discord');
  });
});
