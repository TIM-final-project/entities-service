import { IsOptional, IsPositive } from "class-validator";

export class ManagerQPs {
  @IsPositive()
  @IsOptional()
  plant?: number;
}