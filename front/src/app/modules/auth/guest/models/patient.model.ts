export interface Patient {
    data?: PatientExam[];
    meta?: Meta;
}

export interface PatientExam {
    id?:             number;
    patient_id?:     number;
    headquarter_id?: number;
    type_exam_id?:   number;
    type_result_id?: number;
    internal_code?:  string;
    date_exam?:      Date;
    date_delivery?:  Date;
    created_at?:     Date;
    updated_at?:     null;
    created_by?:     number;
    updated_by?:     null;
    patient?:        PatientClass;
    headquarters?:   Headquarters;
    typesExam?:      Types;
    typesResult?:    Types;
}

export interface Headquarters {
    id?:         number;
    code?:       string;
    name?:       string;
    address?:    string;
    cellphone?:  string;
    email?:      string;
    created_at?: Date;
    updated_at?: null;
    created_by?: null;
    updated_by?: null;
}

export interface PatientClass {
    id?:         number;
    document?:   string;
    names?:      string;
    surnames?:   string;
    address?:    string;
    cellphone?:  string;
    email?:      string;
    password?:   string;
    created_at?: Date;
    updated_at?: null;
    created_by?: number;
    updated_by?: null;
}

export interface Types {
    id?:          number;
    description?: string;
    created_at?:  Date;
    updated_at?:  null;
    created_by?:  number;
    updated_by?:  null;
}

export interface Meta {
    page?:            number;
    take?:            number;
    itemCount?:       number;
    pageCount?:       number;
    hasPreviousPage?: boolean;
    hasNextPage?:     boolean;
}
