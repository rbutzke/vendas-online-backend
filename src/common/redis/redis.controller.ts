import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  // POST /redis/set
  @Post('set')
  async setValue(
    @Body() setValueDto: { key: string; value: string; expireIn?: number }
  ) {
    await this.redisService.set(setValueDto.key, setValueDto.value, setValueDto.expireIn);
    return { 
      message: 'Value set successfully',
      key: setValueDto.key
    };
  }

  // GET /redis/get/:key
  @Get('get/:key')
  async getValue(@Param('key') key: string) {
    const value = await this.redisService.get(key);
    return { key, value };
  }

  // GET /redis/exists/:key
  @Get('exists/:key')
  async checkExists(@Param('key') key: string) {
    const exists = await this.redisService.exists(key);
    return { key, exists: exists === 1 };
  }

  // DELETE /redis/delete/:key
  @Delete('delete/:key')
  async deleteKey(@Param('key') key: string) {
    const result = await this.redisService.del(key);
    return { 
      message: result === 1 ? 'Key deleted successfully' : 'Key not found',
      deleted: result === 1
    };
  }

  // POST /redis/hash
  @Post('hash')
  async setHashValue(
    @Body() setHashDto: { key: string; field: string; value: string }
  ) {
    await this.redisService.hset(setHashDto.key, setHashDto.field, setHashDto.value);
    return { 
      message: 'Hash field set successfully',
      key: setHashDto.key,
      field: setHashDto.field
    };
  }

  // GET /redis/hash/:key/:field
  @Get('hash/:key/:field')
  async getHashValue(
    @Param('key') key: string,
    @Param('field') field: string
  ) {
    const value = await this.redisService.hget(key, field);
    return { key, field, value };
  }

  // GET /redis/hash/:key
  @Get('hash/:key')
  async getAllHash(@Param('key') key: string) {
    const hash = await this.redisService.hgetall(key);
    return { key, hash };
  }

  // POST /redis/expire/:key
  @Post('expire/:key')
  async setExpiration(
    @Param('key') key: string,
    @Body() body: { seconds: number }
  ) {
    const result = await this.redisService.expire(key, body.seconds);
    return { 
      message: result === 1 ? 'Expiration set successfully' : 'Key not found',
      success: result === 1
    };
  }
}
