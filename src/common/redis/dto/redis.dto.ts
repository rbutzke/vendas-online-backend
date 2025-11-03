import { IsString, IsNumber, IsOptional } from 'class-validator';

export class SetValueDto {
  @IsString()
  key: string;

  @IsString()
  value: string;

  @IsOptional()
  @IsNumber()
  expireIn?: number;
}

export class SetHashDto {
  @IsString()
  key: string;

  @IsString()
  field: string;

  @IsString()
  value: string;
}

export class SetExpirationDto {
  @IsNumber()
  seconds: number;
}