import { IntersectionType, PartialType } from "@nestjs/swagger";
import { UpdateData } from "src/common/dto/update.dto";
import { CreateManagerDto } from "./create-manager.dto";

export class UpdateManagerDto extends IntersectionType(
    PartialType(CreateManagerDto),
    UpdateData,
) {}