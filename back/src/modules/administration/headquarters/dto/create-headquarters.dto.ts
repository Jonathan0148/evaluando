import { IsNotEmpty, IsString } from "class-validator";

export class CreateHeadquartersDto {
    @IsNotEmpty()
    @IsString()
    code: string;
    
    @IsNotEmpty()
    @IsString()
    name: string;

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