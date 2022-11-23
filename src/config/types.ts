type Postgres = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  connectionString: string;
};

type Server = {
  port: number;
  env: string;
};

type Config = {
  postgres: Postgres;
  server: Server;
};

export default Config;
