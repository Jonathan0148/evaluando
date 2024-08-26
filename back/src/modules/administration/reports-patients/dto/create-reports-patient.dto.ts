import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateReportsPatientDto {
    @IsNotEmpty()
    @IsNumber()
    patient_id: number;
    
    @IsNotEmpty()
    @IsString()
    file_location: string;
    
    @IsNotEmpty()
    @IsOptional()
    name?: string;
}