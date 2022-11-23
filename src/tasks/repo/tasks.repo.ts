import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';

@Injectable()
export class TasksRepo {
  constructor(@InjectKnex() public readonly knex: Knex) {}

  public get tableName() {
    return 'tasks';
  }

  public get publicColumns() {
    return ['id', 'url', 'status', 'http_code'];
  }
}
