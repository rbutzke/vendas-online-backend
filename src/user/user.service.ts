import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PG_POOL } from '../common/pg/pg.constants';
import { Pool } from 'pg';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ReturnUserDto } from './dto/return-user.dto';


@Injectable()
export class UserService {

  constructor(@Inject(PG_POOL) private readonly pgPool: Pool) {
    this.pgPool.connect();
  }

async createUser(createUserDto: CreateUserDto): Promise<UserEntity> { // Utilizar User como tipo de retorno

    const saltOrRounds = 10;
    const passwordhash = await bcrypt.hash(createUserDto.password, saltOrRounds);

        // Cria um novo objeto combinando o DTO com o passwordhash
    const userData = {
        ...createUserDto,
        password: passwordhash
    };

    //Extrai as chaves do objeto DTO (colunas)
    const columns = Object.keys(userData);
    //Extrai os valores do objeto DTO (valores a serem inseridos)
    const values = Object.values(userData);

    //Gera os placeholders parametrizados (e.g., "$1, $2, $3")
    //O driver pg usa $N para prevenir SQL Injection.
    const placeholders = columns.map((_, index) => `$${index + 1}`).join(', ');
    
    //Monta a string SQL dinamicamente
    const queryText = `
      INSERT INTO users (${columns.join(', ')})
      VALUES (${placeholders})
      RETURNING *;
    `;

    // Executa a query com os valores parametrizados
    const res = await this.pgPool.query(queryText, values);
     // Retorna o primeiro registro inserido, agora tipado como User
    return res.rows[0] as UserEntity; // Usa um type assertion para garantir o tipo retornado
}

  async findAllUser(): Promise<ReturnUserDto[]> {
    const result = await this.pgPool.query('SELECT * FROM users');
    return (result.rows).map((UserEntity) => new ReturnUserDto(UserEntity));
  }

  async findOne(id: number) {

    const query = 'SELECT * FROM users WHERE id = $1';
    const values = [id];
    const result = await this.pgPool.query(query, values);
    return result.rows[0];
  }

  // Atualiza um usuário existente com base no ID fornecido e nos dados do DTO
  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const columns = Object.keys(updateUserDto);
    const values = Object.values(updateUserDto);

    if (columns.length === 0) {
      throw new NotFoundException(`No data provided for update.`);
    }

    const setClause = columns
      .map((column, index) => `${column} = $${index + 1}`)
      .join(', ');

    values.push(id);
    const idPlaceholder = `$${values.length}`;

    const queryText = `
      UPDATE users
      SET ${setClause}
      WHERE id = ${idPlaceholder}
      RETURNING *;
    `;

    const res = await this.pgPool.query(queryText, values);
    
    if (res.rows.length === 0) {
        throw new NotFoundException(`User with ID "${id}" not found.`);
    }

    return res.rows[0] as UserEntity;
  }

  async remove(id: number) {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await this.pgPool.query(query, values);
    // Returns the deleted row data
    return result.rows[0]; 

  }
}
