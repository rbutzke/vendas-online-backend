import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { Pool } from 'pg';
import { PG_POOL } from '../common/pg/pg.constants';
import { Inject } from '@nestjs/common';
import { RedisService } from '../common/redis/redis.service';
import { ReturnCityDto } from './dto/return-city.dto';

@Injectable()
export class CityService {


  constructor(@Inject(PG_POOL) private readonly pgPool: Pool,
  @Inject(RedisService) private readonly redisService: RedisService
) {
    this.pgPool.connect();
  }
 

/*
  create(createCityDto: CreateCityDto) {
    return 'This action adds a new city';
  }

  findAll() {
    return `This action returns all city`;
  }
*/
  async findOne(state_id: number): Promise<ReturnCityDto[]> {
    
    const cacheKey = `user_${state_id}`;
   
    const cachedCity = await this.redisService.get(cacheKey);

    if (cachedCity) {
      console.log('Cache hit for key:', cacheKey);
      if (typeof cachedCity === 'string') {
        return JSON.parse(cachedCity);
      }
      return cachedCity;
    }

    const query = 'SELECT * FROM city WHERE state_id = $1';
    const values = [state_id];
    const result = await this.pgPool.query(query, values);
    
    // formata conforme os campos do DTO return retirando configs do DB
    const resultf = (result.rows).map((CityEntity) => new ReturnCityDto(CityEntity));  

    await this.redisService.set(cacheKey, JSON.stringify(resultf), 3600);
  
    //return (result.rows).map((CityEntity) => new ReturnCityDto(CityEntity))  
    return resultf;
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
