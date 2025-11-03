import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PG_POOL } from '../common/pg/pg.constants';
import { Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { AddressEntity } from './entities/address.entity';
import { ReturnAddressDto } from './dto/return-address.dto';

@Injectable()
export class AddressService {

  constructor(@Inject(PG_POOL) private readonly pgPool: Pool) {
      this.pgPool.connect();
  }

  async createAddress(createAddressDto: CreateAddressDto): Promise<AddressEntity> { // Utilizar User como tipo de retorno

      //Extrai as chaves do objeto DTO (colunas)
      const columns = Object.keys(createAddressDto);
      //Extrai os valores do objeto DTO (valores a serem inseridos)
      const values = Object.values(createAddressDto);
  
      //Gera os placeholders parametrizados (e.g., "$1, $2, $3")
      //O driver pg usa $N para prevenir SQL Injection.
      const placeholders = columns.map((_, index) => `$${index + 1}`).join(', ');
      
      //Monta a string SQL dinamicamente
      const queryText = `
        INSERT INTO address (${columns.join(', ')})
        VALUES (${placeholders})
        RETURNING *;
      `;
  
      // Executa a query com os valores parametrizados
      const res = await this.pgPool.query(queryText, values);
       // Retorna o primeiro registro inserido, agora tipado como User
      return res.rows[0] as AddressEntity; // Usa um type assertion para garantir o tipo retornado
  }

  async findAllAddress(): Promise<[ReturnAddressDto]> {
    const result = await this.pgPool.query('SELECT * FROM address');
    return (result.rows).map((AddressEntity) => new ReturnAddressDto(AddressEntity));
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
