import { IsOptional, IsPositive } from "class-validator";

export class AuditorQPs{
    @IsPositive()
    @IsOptional()
    plant?: number;
}