import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CreateDto } from './dto/create.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  @Inject() private readonly service: TasksService;

  @Get()
  public findAll() {
    return this.service.findAll();
  }

  @Post()
  public create(@Body() data: CreateDto) {
    return this.service.create(data);
  }
}
