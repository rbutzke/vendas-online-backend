import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { Pool } from 'pg';
import { PG_POOL } from '../common/pg/pg.constants';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class CityService {


  constructor(@Inject(PG_POOL) private readonly pgPool: Pool) {
    this.pgPool.connect();
  }
  
  @Inject(CACHE_MANAGER) private cacheManager: Cache
 
/*
  create(createCityDto: CreateCityDto) {
    return 'This action adds a new city';
  }

  findAll() {
    return `This action returns all city`;
  }
*/
  async findOne(state_id: number){
    
    const cacheKey = `user_${state_id}`;
    // Tentar obter do cache
    const cachedUser = await this.cacheManager.get(cacheKey);

    if (cachedUser) {
      console.log('Cache hit for key:', cacheKey);
      return cachedUser;
    }
   
    const query = 'SELECT * FROM city WHERE state_id = $1';
    const values = [state_id];
    const result = await this.pgPool.query(query, values);

    // Salvar no cache por 5 minutos
    await this.cacheManager.set(cacheKey, result, 300000);

    return result.rows;
  }   

/*
  update(id: number, updateCityDto: UpdateCityDto) {
    return `This action updates a #${id} city`;
  }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }
*/  
}
