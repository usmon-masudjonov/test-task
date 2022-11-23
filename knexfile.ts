import type { Knex } from 'knex';
import Config from './src/config/config';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: {
      database: Config.postgres.database,
      user: Config.postgres.user,
      password: Config.postgres.password,
      port: Config.postgres.port,
      host: Config.postgres.host,
    },
  },
  staging: {
    client: 'postgresql',
    connection: {
      database: Config.postgres.database,
      user: Config.postgres.user,
      password: Config.postgres.password,
      port: Config.postgres.port,
      host: Config.postgres.host,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
  production: {
    client: 'postgresql',
    connection: {
      database: Config.postgres.database,
      user: Config.postgres.user,
      password: Config.postgres.password,
      port: Config.postgres.port,
      host: Config.postgres.host,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};

export default config;
