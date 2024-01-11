import { cleanEnv, str, url } from 'envalid';

export const configs = cleanEnv(process.env, {
  FBB_BOT_SECRET: str({ devDefault: 'change-me' }),
  FBB_BOT_CLIENT_ID: str({ devDefault: 'change-me' }),
  OAUTH_CALLBACK_URL: url({
    devDefault: 'http://localhost:3000/auth/redirect',
  }),
  COSMOS_CONNECTION_STRING: str({ devDefault: 'change-me' }),
  //   COSMOS_CONNECTION_STRING: str({ devDefault: 'mongodb://localhost:27017' }),
  NODE_ENV: str({
    choices: ['development', 'test', 'production', 'staging'],
    devDefault: 'development',
  }),
  SESSION_SECRET: str({ devDefault: 'change-me' }),
});
