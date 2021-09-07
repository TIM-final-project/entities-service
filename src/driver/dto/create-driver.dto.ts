
export class CreateDriverDto {
  name: string;
  surname: string;
  cuit: string;
  birth_date?: Date;
  contractorId: number;
}
