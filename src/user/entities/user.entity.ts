import { CreateUserDto } from '../dto/create-user.dto'

// A classe User herda de CreateUserDto e adiciona os campos que são gerados 
// automaticamente pelo banco de dados ou pelo sistema.
export class User extends CreateUserDto {
     // O 'id' geralmente é um número e autoincrementado pelo banco de dados
    id: number; 
    // 'created_at' e 'updated_at' são timestamps (ou datas) e gerenciados pelo Database
    created_at: Date; 
    updated_at: Date; 
}
