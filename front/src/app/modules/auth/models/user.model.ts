export interface User {
  id?:  number;
  name?: string;
  role_id?: string;
  avatar?: string;
  email?: string;
  password?: string;
  phone?: string;
  document?: string;
  address?: string;
  is_active?: boolean;
  state?: boolean;
  document_types_id?: number;
  regions_id?: number;
  companies_id?: number;
  projects_id?: number;
}

export interface UserTokenDecode {
  id?: string;
  names?: string;
  role?: string;
  avatar?: string;
  patientId?: number;
}

export interface Country {
  name?: string;
  code?: string;
}

export interface Representative {
  name?: string;
  image?: string;
}

export interface Customer {
  id?: number;
  name?: string;
  country?: Country;
  company?: string;
  date?: string;
  status?: string;
  activity?: number;
  representative?: Representative;
}
