import { IsPositive } from "class-validator";

export class ExpeditorQPs {
  @IsPositive()
  plant?: number;
}