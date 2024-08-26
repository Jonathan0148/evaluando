import { IsNotEmpty, IsNumber } from "class-validator";

export class FindAllRPDto {
    @IsNotEmpty()
    @IsNumber()
    patientId: number;
}