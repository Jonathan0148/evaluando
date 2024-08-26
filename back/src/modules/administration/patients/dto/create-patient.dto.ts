import { IsNotEmpty, IsString } from "class-validator";

export class CreatePatientDto {
    @IsNotEmpty()
    @IsString()
    document: string;
    
    @IsNotEmpty()
    @IsString()
    names: string;
    
    @IsNotEmpty()
    @IsString()
    surnames: string;
    
    @IsNotEmpty()
    @IsString()
    address: string;
    
    @IsNotEmpty()
    @IsString()
    cellphone: string;
    
    @IsNotEmpty()
    @IsString()
    email: string;
}