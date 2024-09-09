import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateContactDto {
    @IsNotEmpty()
    @IsString()
    names: string;
    
    @IsOptional()
    @IsString()
    surnames: string;
    
    @IsOptional()
    @IsString()
    address: string;
    
    @IsNotEmpty()
    @IsString()
    cellphone: string;
    
    @IsNotEmpty()
    @IsString()
    email: string;
    
    @IsOptional()
    @IsString()
    comments: string;
    
    @IsNotEmpty()
    @IsNumber()
    headquarters_id: number;
}