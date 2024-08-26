import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateExamsPatientDto {
    @IsNotEmpty()
    @IsNumber()
    patient_id: number;
    
    @IsNotEmpty()
    @IsNumber()
    headquarter_id: number;
    
    @IsNotEmpty()
    @IsNumber()
    type_exam_id: number;
    
    @IsNotEmpty()
    @IsNumber()
    type_result_id: number;
    
    @IsNotEmpty()
    @IsString()
    internal_code: string;
    
    @IsNotEmpty()
    @IsString()
    date_exam: string;
    
    @IsNotEmpty()
    @IsString()
    date_delivery: string;
}