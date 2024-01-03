import { IsPositive } from "class-validator";

export class AuditorQPs{
    @IsPositive()
    plant?: number;
}