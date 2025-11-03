import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { RedisModule } from '../common/redis/redis.module';

@Module({
  imports: [RedisModule], 
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
