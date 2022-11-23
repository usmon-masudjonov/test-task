import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, IsNotEmpty } from 'class-validator';

export class CreateDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  url: string;
}
