export interface Survey {
  id?: number;
  name?: String;
  date?: String;
  description?: String;
  is_active?: Boolean;
  surveyQuestion?: SurveyQuestion[];
}

export interface SurveyQuestion {
  surveys_id?: number;
  code?: String;
  description?: String;
  minimun_scroe?: number;
  maximun_score?: number;
  question_order?: number
  is_active?: Boolean
}

export interface SurveysAnswer {
  id?:                   number;
  patient_id?:           number;
  surveys_id?:           number;
  surveys_questions_id?: number;
  score?:                number;
  survey?:               Survey;
  surveyQuestion?:       SurveyQuestion;
}