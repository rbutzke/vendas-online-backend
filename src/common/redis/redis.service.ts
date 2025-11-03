import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
  ) {}

  // Método para setar um valor
  async set(key: string, value: string, expireInSeconds?: number): Promise<void> {
    if (expireInSeconds) {
      await this.redisClient.setex(key, expireInSeconds, value);
    } else {
      await this.redisClient.set(key, value);
    }
  }

  // Método para obter um valor
  async get(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }

  // Método para deletar uma chave
  async del(key: string): Promise<number> {
    return await this.redisClient.del(key);
  }

  // Método para verificar se uma chave existe
  async exists(key: string): Promise<number> {
    return await this.redisClient.exists(key);
  }

  // Método para definir tempo de expiração
  async expire(key: string, seconds: number): Promise<number> {
    return await this.redisClient.expire(key, seconds);
  }

  // Método para operações com hash
  async hset(key: string, field: string, value: string): Promise<number> {
    return await this.redisClient.hset(key, field, value);
  }

  async hget(key: string, field: string): Promise<string | null> {
    return await this.redisClient.hget(key, field);
  }

  async hgetall(key: string): Promise<Record<string, string>> {
    return await this.redisClient.hgetall(key);
  }
}