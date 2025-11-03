import { CreateStateDto } from "../dto/create-state.dto";

export class State extends CreateStateDto {
    id: number;
    created_at: Date;
    updated_at: Date;
}

