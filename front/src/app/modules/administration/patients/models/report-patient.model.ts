import { Patient } from "./patient.model";

export interface ReportPatient {
  id?: number;
  patient_id?: number;
  file_location?: String,
  name?: String,
  patient?: Patient
}