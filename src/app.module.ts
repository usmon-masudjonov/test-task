import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from 'nestjs-knex';
import { TasksModule } from './tasks/tasks.module';
import knexConfig from '../knexfile';
import config from './config/config';

@Module({
  imports: [
    KnexModule.forRoot({
      config: knexConfig[config.server.env],
    }),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
