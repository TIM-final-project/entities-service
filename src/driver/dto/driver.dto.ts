import { ContractorDto } from "src/contractors/dto/contractor.dto";
import { IntersectionType } from '@nestjs/swagger';
import { EntityDto } from "src/common/dto/entity.dto";


class DriverData {
  surname: string;
  birth_date?: Date;
  contractor?: ContractorDto;
}

export class DriverDto extends IntersectionType(
  EntityDto,
  DriverData
){}