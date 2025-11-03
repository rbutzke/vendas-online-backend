import { CreateUserDto } from '../dto/create-user.dto'

// A classe User herda de CreateUserDto e adiciona os campos que são gerados 
// automaticamente pelo banco de dados ou pelo sistema.
export class UserEntity {
 
    id: number;
    name: string;
    email: string;
    phone: string;
    cpf: string;
    password: string;
    typeUser: number;
    createdAt: Date;
    updatedAt: Date;
}
