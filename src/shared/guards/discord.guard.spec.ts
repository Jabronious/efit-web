import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DiscordGuard } from './discord.guard';

describe('DiscordGuard', () => {
  let guard: DiscordGuard;

  beforeEach(() => {
    guard = new DiscordGuard();
    AuthGuard('discord').prototype.canActivate = jest
      .fn()
      .mockResolvedValue(true);
    AuthGuard('discord').prototype.logIn = jest.fn().mockResolvedValue(true);
  });

  describe('canActivate', () => {
    it('should call AuthGuard canActivate method', async () => {
      const context: ExecutionContext = {
        switchToHttp: () => ({
          getRequest: () => ({
            user: {
              /* user object */
            },
          }),
        }),
      } as ExecutionContext;

      expect(await guard.canActivate(context)).toBeTruthy();
      expect(AuthGuard('discord').prototype.canActivate).toHaveBeenCalledWith(
        context,
      );
    });
  });
});
