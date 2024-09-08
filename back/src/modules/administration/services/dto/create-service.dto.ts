import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateServiceDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    image: string;
    
    @IsOptional()
    @IsString()
    description: string;
}