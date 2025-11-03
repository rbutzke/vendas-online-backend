import { CreateCityDto } from "../dto/create-city.dto";

export class City extends CreateCityDto {

         // O 'id' geralmente é um número e autoincrementado pelo banco de dados
    id: number; 
    state_id: number;
    // 'created_at' e 'updated_at' são timestamps (ou datas) e gerenciados pelo Database
    created_at: Date; 
    updated_at: Date;
}
