import { IsPositive } from "class-validator";

export class SecurityQPs{
    @IsPositive()
    plant?: number;
}