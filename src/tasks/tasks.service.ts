import createSubscriber from 'pg-listen';
import config from 'src/config/config';
import { InjectKnex, Knex } from 'nestjs-knex';
import { Injectable } from '@nestjs/common';
import { TasksRepo } from './repo/tasks.repo';
import { EventsEnum } from './enums/evens.enum';
import { HandleCreatedNewTaskEventDto } from './dto/handleCreatedNewTask.dto';
import { TaskStatusEnum } from './enums/taskStatus.enum';
import { CreateDto } from './dto/create.dto';

@Injectable()
export class TasksService {
  constructor(
    private readonly repo: TasksRepo,
    @InjectKnex() public readonly knex: Knex,
  ) {
    (async () => {
      const subscriber = createSubscriber({
        connectionString: config.postgres.connectionString,
      });

      await subscriber.connect();
      await subscriber.listenTo(EventsEnum.CREATED_NEW_TASK);

      subscriber.notifications.on(
        EventsEnum.CREATED_NEW_TASK,
        this.handleCreatedNewTaskEvent.bind(this),
      );
    })();
  }

  public async handleCreatedNewTaskEvent(data: HandleCreatedNewTaskEventDto) {
    const repo = this.repo;

    const transactionProvider = repo.knex.transactionProvider();
    const transaction = await transactionProvider();

    await transaction(repo.tableName)
      .update({
        status: TaskStatusEnum.PROCESSING,
      })
      .where('id', data.id);

    try {
      const response = await fetch(data.url);

      await transaction(repo.tableName)
        .update({
          status: TaskStatusEnum.DONE,
          http_code: response.status,
        })
        .where('id', data.id);

      await transaction.commit();
    } catch (error) {
      await transaction(repo.tableName)
        .update({
          status: TaskStatusEnum.ERROR,
          http_code: null,
        })
        .where('id', data.id);

      await transaction.commit();
    }
  }

  public async findAll() {
    return this.repo.findAll();
  }

  public async create(data: CreateDto) {
    return this.repo.create(data);
  }
}
