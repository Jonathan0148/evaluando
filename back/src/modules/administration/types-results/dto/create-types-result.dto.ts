import { IsNotEmpty, IsString } from "class-validator";

export class CreateTypesResultDto {
    @IsNotEmpty()
    @IsString()
    description: string;
}