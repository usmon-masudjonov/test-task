import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(
    `
      create or replace function fn_task_created() returns trigger as $psql$
        declare current_task_id int; 
        begin
          select id into current_task_id from tasks where url = new.url and status != 'DONE';

          if current_task_id is not null then
            return null;
          end if;

          perform pg_notify(
            'CREATED_NEW_TASK',
            json_build_object('id', new.id, 'url', new.url)::text
          );
        
          return new;
        end;
      $psql$ language plpgsql;
    `,
  );

  await knex.raw(`
    create trigger task_create before insert on tasks for each row execute procedure fn_task_created();
  `);
}

export async function down(): Promise<void> {
  /**/
}
