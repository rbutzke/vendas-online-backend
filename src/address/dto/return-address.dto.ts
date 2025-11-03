import { AddressEntity } from '../entities/address.entity';

export class ReturnAddressDto {
  id: number;
  complement: string;
  number: number;
  cep: string;
   

  constructor(addressEntity: AddressEntity) {
    this.id = addressEntity.id;
    this.complement = addressEntity.complement;
    this.number = addressEntity.number;
    this.cep = addressEntity.cep;
  }
}