import { cleanEnv, str, url } from 'envalid';

export const configs = cleanEnv(process.env, {
  FBB_BOT_SECRET: str(),
  FBB_BOT_CLIENT_ID: str(),
  FBB_BOT_TOKEN: str(),
  OAUTH_CALLBACK_URL: url({
    default: 'http://localhost:3000/auth/redirect',
  }),
  COSMOS_CONNECTION_STRING: str(),
  NODE_ENV: str({
    choices: ['development', 'test', 'production', 'staging'],
    default: 'development',
  }),
  JWT_SECRET: str({ default: 'change-me' }),
});
