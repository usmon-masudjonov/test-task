import { Module } from '@nestjs/common';
import { TasksRepo } from './repo/tasks.repo';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';

@Module({
  providers: [TasksService, TasksRepo],
  controllers: [TasksController],
})
export class TasksModule {}
