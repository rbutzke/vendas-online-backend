// src/redis/redis.controller.ts
import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('cache')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Get(':key')
  async get(@Param('key') key: string) {
    const value = await this.redisService.get(key);
    return { key, value };
  }

  @Post()
  async set(@Body() data: { key: string; value: any; ttl?: number }) {
    await this.redisService.set(data.key, data.value, data.ttl);
    return { message: 'Cache definido com sucesso' };
  }

  @Delete(':key')
  async del(@Param('key') key: string) {
    await this.redisService.del(key);
    return { message: 'Cache deletado com sucesso' };
  }

  @Delete()
  async reset() {
    await this.redisService.clearAll();
    return { message: 'Cache resetado com sucesso' };
  }
}