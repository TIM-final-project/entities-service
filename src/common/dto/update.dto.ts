import { IsBoolean } from "class-validator";

export class UpdateData {
    @IsBoolean()
    active: boolean;
}
  