import { IsNotEmpty, IsString } from "class-validator";

export class PatientAuthDto {
    @IsNotEmpty()
    @IsString()
    document: string;
    
    @IsNotEmpty()
    @IsString()
    password: string;
}