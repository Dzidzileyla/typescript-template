import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();

const env = process.env.NODE_ENV || 'dev';
switch (env) {
  case 'dev':
    dotenv.config({ path: resolve('.env.dev') });
    break;
  case 'prod':
    dotenv.config({ path: resolve('.env') });
    break;
  default:
    dotenv.config({ path: resolve('.env.dev') });
    break;
}

import config from './dev';
export default config;
