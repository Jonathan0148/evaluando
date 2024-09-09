import { IsNotEmpty, IsString } from "class-validator";

export class GetExamDto {
    @IsNotEmpty()
    @IsString()
    initDate: string
    
    @IsNotEmpty()
    @IsString()
    endDate: string
}