import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { configs } from './configuration';
import { ValidationPipe } from '@nestjs/common';
import { engine } from 'express-handlebars';
import { User } from './users/schemas/users.schema';
import { readFileSync } from 'fs';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';

async function bootstrap() {
  let tlsOptions: HttpsOptions;
  if (
    configs.isDevelopment ||
    configs.isProduction ||
    configs.NODE_ENV === 'staging'
  ) {
    tlsOptions = {
      key: readFileSync('/etc/tls/tls.key'),
      cert: readFileSync('/etc/tls/tls.crt'),
    };
  }
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    httpsOptions: tlsOptions,
  });
  const helpers = {
    userCookiePresent: (user: User): boolean => {
      return user.espn_s2 && user.swid ? true : false;
    },
  };

  app.useStaticAssets(join(__dirname, '..', 'client'));
  app.setViewEngine('hbs');
  app.engine(
    'hbs',
    engine({
      extname: 'hbs',
      helpers,
      partialsDir: join(__dirname, '..', 'views', 'partials'),
    }),
  );
  app.use(
    session({
      secret: configs.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
