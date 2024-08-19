export interface Patient {
  id?: number;
  document_types_id?: number;
  document?: String;
  names?: String;
  site?: String;
  room?: String;
  floor?: String;
  diagnosis_code?: String;
  diagnosis?: String;
  allergies?: String;
  background?: String;
  birth_date?: Date;
  gender?: String;
  diet_type?: String;
  observations?: String;
  preferences?: String;
}