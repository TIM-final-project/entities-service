import { IsPositive } from "class-validator";

export class ShittyManagerQPs{
    @IsPositive()
    plant?: number;
}