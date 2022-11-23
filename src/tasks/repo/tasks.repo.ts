import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { CreateDto } from '../dto/create.dto';
import { TaskStatusEnum } from '../enums/taskStatus.enum';

@Injectable()
export class TasksRepo {
  constructor(@InjectKnex() public readonly knex: Knex) {}

  public get tableName() {
    return 'tasks';
  }

  private get publicColumns() {
    return ['id', 'url', 'status', 'http_code'];
  }

  public findAll() {
    return this.knex(this.tableName).select(this.publicColumns);
  }

  public async create(data: CreateDto) {
    return (
      await this.knex(this.tableName)
        .insert({
          url: data.url,
          status: TaskStatusEnum.NEW,
        })
        .returning(this.publicColumns)
    )[0];
  }
}
