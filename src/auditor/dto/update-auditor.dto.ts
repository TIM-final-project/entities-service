import { IntersectionType, PartialType } from "@nestjs/swagger";
import { UpdateData } from "src/common/dto/update.dto";
import { CreateAuditorDto } from "./create-auditor.dto";

export class UpdateAuditorDto extends IntersectionType(
    PartialType(CreateAuditorDto),
    UpdateData,
  ) {}