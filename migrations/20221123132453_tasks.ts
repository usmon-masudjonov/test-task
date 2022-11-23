import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    create type task_status_enum as enum('NEW', 'PROCESSING', 'DONE', 'ERROR');
  `);

  await knex.raw(`
    create table if not exists tasks(
      id serial primary key,
      url varchar(2048) not null,
      status task_status_enum not null default 'NEW',
      http_code varchar(3)
    );
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    drop table tasks cascade;
  `);
}
