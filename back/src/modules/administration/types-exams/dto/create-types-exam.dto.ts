import { IsNotEmpty, IsString } from "class-validator";

export class CreateTypesExamDto {
    @IsNotEmpty()
    @IsString()
    description: string;
}