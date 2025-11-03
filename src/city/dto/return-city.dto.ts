import { Expose } from 'class-transformer';
import { CityEntity } from '../entities/city.entity';

export class ReturnCityDto {
  id: number;
  state_id: number;
  name: string;
  created_at: Date;
  updated_at: Date;



  constructor(cityEntity: CityEntity) {
    this.id = cityEntity.id;
    this.state_id = cityEntity.state_id;
    this.name = cityEntity.name;
  }
}