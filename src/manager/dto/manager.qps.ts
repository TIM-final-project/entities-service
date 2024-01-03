import { IsPositive } from "class-validator";

export class ManagerQPs {
  @IsPositive()
  plant?: number;
}