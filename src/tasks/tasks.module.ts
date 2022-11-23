import { Module } from '@nestjs/common';
import { TasksRepo } from './repo/tasks.repo';
import { TasksService } from './tasks.service';

@Module({
  providers: [TasksService, TasksRepo],
})
export class TasksModule {}
