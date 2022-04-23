import { IntersectionType, PartialType } from "@nestjs/swagger";
import { UpdateData } from "src/common/dto/update.dto";
import { CreateExpeditorDTO } from "./expeditor-create.dto";

export class UpdateExpeditorDTO extends IntersectionType(
    PartialType(CreateExpeditorDTO),
    UpdateData,
) {}