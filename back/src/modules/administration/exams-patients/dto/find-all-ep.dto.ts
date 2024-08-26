import { IsNotEmpty, IsNumber } from "class-validator";

export class FindAllEPDto {
    @IsNotEmpty()
    @IsNumber()
    patientId: number;
}