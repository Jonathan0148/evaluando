import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRoleDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsArray()
    rolesModules: CreateRoleModuleDto[];
}

export class CreateRoleModuleDto {
    @IsNotEmpty()
    @IsNumber()
    modules_id: number;

    @IsNotEmpty()
    @IsArray()
    selectedValue: SelectedValueDto[];
}

export class SelectedValueDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsNumber()
    value: number;
}