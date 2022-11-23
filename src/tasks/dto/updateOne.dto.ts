import { TaskStatusEnum } from '../enums/taskStatus.enum';

export class UpdateOneDto {
  id: number;
  status: TaskStatusEnum[];
}
