// src/redis/redis.module.ts
import { Module, Global } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],  
      useFactory: async (configService: ConfigService): Promise<any>=> {
        const store = await redisStore({
          socket: {
            host: configService.get<string>('REDIS_HOST'),
            port: configService.get<number>('REDIS_PORT'),
          },
          password: configService.get<string>('REDIS_PASSWORD'),
          database: configService.get<number>('REDIS_DB'),
          ttl: configService.get<number>('REDIS_TTL'),
        });
        return {
          store: () => store,
        };
      },
    }),
  ],
  providers: [RedisService],
  controllers: [RedisController],
  exports: [RedisService, CacheModule],
})
export class RedisModule {}