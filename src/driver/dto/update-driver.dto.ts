import { IntersectionType, OmitType, PartialType } from "@nestjs/swagger";
import { UpdateData } from "src/common/dto/update.dto";
import { CreateDriverDto } from "./create-driver.dto";

export class UpdateDriverDto extends IntersectionType(
    PartialType(OmitType(CreateDriverDto, ['contractorId'] as const)),
    UpdateData,
  ) {}
  
