export interface User {
  id?: number;
  names?: string;
  surnames?: string;
  user_name?: string;
  headquarters_id?: string;
  roles_id?: string;
  email?: string;
  password?: string;
  active?: boolean;
}

export interface UserTokenDecode {
  id?: string;
  name?: string;
  role?: string;
  avatar?: string;
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
