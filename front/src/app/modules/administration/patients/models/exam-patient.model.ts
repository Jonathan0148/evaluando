import { Patient } from "./patient.model";

export interface ExamPatient {
  id?: number;
  patient_id?: number;
  headquarter_id?: number;
  type_exam_id?: number;
  type_result_id?: number;
  internal_code?: String;
  date_exam?: Date;
  date_delivery?: Date;
  patient?: Patient
}