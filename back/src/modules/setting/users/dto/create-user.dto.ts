import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsNumber()
    @IsNotEmpty()
    headquarters_id: number;
    
    @IsNumber()
    @IsNotEmpty()
    roles_id: number;

    @IsString()
    @IsNotEmpty()
    document: string;

    @IsString()
    @IsNotEmpty()
    names: string;

    @IsString()
    @IsNotEmpty()
    surnames: string;

    @IsString()
    @IsNotEmpty()
    user_name: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsBoolean()
    @IsNotEmpty()
    active: boolean;
}