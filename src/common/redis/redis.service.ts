// src/redis/redis.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  /**
   * Obter valor do cache
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      return (await this.cache.get<T>(key)) ?? null;
    } catch (error) {
      console.error('Erro ao obter do Redis:', error);
      return null;
    }
  }

  /**
   * Definir valor no cache
   */
  async set(key: string, value: any, ttl?: number): Promise<void> {
    try {
      await this.cache.set(key, value, ttl);
    } catch (error) {
      console.error('Erro ao definir no Redis:', error);
    }
  }

  /**
   * Deletar chave do cache
   */
  async del(key: string): Promise<void> {
    try {
      await this.cache.del(key);
    } catch (error) {
      console.error('Erro ao deletar do Redis:', error);
    }
  }

  /**
   * Resetar todo o cache
   */
  async clearAll(): Promise<void> {
    try {
      await this.cache.clear();
    } catch (error) {
      console.error('Erro ao resetar Redis:', error);
    }
  }

  /**
   * Obter múltiplas chaves
   */
  async mget(keys: string[]): Promise<any[]> {
    try {
     const promises = keys.map(key => this.get(key));
     return await Promise.all(promises);
   } catch (error) {
     console.error('Erro ao obter múltiplas chaves:', error);
     return [];
   }
  }


  async mset(data: { key: string; value: any; ttl?: number }[]): Promise<void> {
    try {
      for (const item of data) {
        await this.set(item.key, item.value, item.ttl);
      }
    } catch (error) {
      console.error('Erro ao definir múltiplas chaves:', error);
    }
  }

  /**
   * Verificar se chave existe
   */
  async exists(key: string): Promise<boolean> {
    try {
      const value = await this.get(key);
      return value !== null && value !== undefined;
    } catch (error) {
      console.error('Erro ao verificar existência:', error);
      return false;
    }
  }

  /**
   * Incrementar valor
   */
  async incr(key: string, value = 1): Promise<number> {
    try {
      const current = await this.get<number>(key);
      const newValue = (current || 0) + value;
      await this.set(key, newValue);
      return newValue;
    } catch (error) {
      console.error('Erro ao incrementar:', error);
      return 0;
    }
  }

  /**
   * Decrementar valor
   */
  async decr(key: string, value = 1): Promise<number> {
    try {
      const current = await this.get<number>(key);
      const newValue = (current || 0) - value;
      await this.set(key, newValue);
      return newValue;
    } catch (error) {
      console.error('Erro ao decrementar:', error);
      return 0;
    }
  }

  /**
   * Obter tempo de expiração restante
   */
  async getTtl(key: string): Promise<number> {
    try {
      // Esta é uma implementação simplificada
      // Em produção, você pode querer usar o cliente Redis diretamente
      const value = await this.get(key);
      if (value === null) return -2;
      return -1; // Retorna -1 se não houver TTL específico
    } catch (error) {
      console.error('Erro ao obter TTL:', error);
      return -2;
    }
  }
}