import Config from './types';
import * as dotenv from 'dotenv';

dotenv.config();

const config: Config = {
  postgres: {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    connectionString: `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DATABASE}`,
  },
  server: {
    port: parseInt(process.env.SERVER_PORT, 10) || 4000,
    env: process.env.ENV,
  },
};

export default config;
