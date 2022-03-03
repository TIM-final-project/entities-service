import { IntersectionType, OmitType, PartialType } from "@nestjs/swagger";
import { UpdateData } from "src/common/dto/update.dto";
import { CreateVehicleDto } from "./create-vehicle.dto";

export class UpdateVehicleDto extends IntersectionType(
  PartialType(OmitType(CreateVehicleDto, ['contractorId'] as const)),
  UpdateData,
) {}
