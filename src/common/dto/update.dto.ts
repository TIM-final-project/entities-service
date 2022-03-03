import { IsBoolean, IsOptional } from "class-validator";

export class UpdateData {
    @IsBoolean()
    @IsOptional()
    active?: boolean;
}
  