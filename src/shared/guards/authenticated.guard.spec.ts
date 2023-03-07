import { ExecutionContext } from '@nestjs/common';
import { AuthenticatedGuard } from './authenticated.guard';

describe('AuthenticatedGuard', () => {
  let guard: AuthenticatedGuard;
  let mockExecutionContext: ExecutionContext;

  beforeEach(() => {
    guard = new AuthenticatedGuard();
    mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          isAuthenticated: jest.fn(),
        }),
      }),
    } as ExecutionContext;
  });

  it('should return true if request is authenticated', async () => {
    const mockRequest = {
      isAuthenticated: jest.fn().mockReturnValue(true),
    };
    jest.spyOn(mockExecutionContext, 'switchToHttp').mockReturnValueOnce({
      getRequest: jest.fn().mockReturnValueOnce(mockRequest),
      getResponse: function <T = any>(): T {
        throw new Error('Function not implemented.');
      },
      getNext: function <T = any>(): T {
        throw new Error('Function not implemented.');
      },
    });

    const canActivate = await guard.canActivate(mockExecutionContext);

    expect(canActivate).toEqual(true);
    expect(mockRequest.isAuthenticated).toHaveBeenCalled();
  });

  it('should return false if request is not authenticated', async () => {
    const mockRequest = {
      isAuthenticated: jest.fn().mockReturnValue(false),
    };
    jest.spyOn(mockExecutionContext, 'switchToHttp').mockReturnValueOnce({
      getRequest: jest.fn().mockReturnValueOnce(mockRequest),
      getResponse: function <T = any>(): T {
        throw new Error('Function not implemented.');
      },
      getNext: function <T = any>(): T {
        throw new Error('Function not implemented.');
      },
    });

    const canActivate = await guard.canActivate(mockExecutionContext);

    expect(canActivate).toEqual(false);
    expect(mockRequest.isAuthenticated).toHaveBeenCalled();
  });
});
