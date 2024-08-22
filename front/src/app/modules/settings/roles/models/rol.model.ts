export interface Rol {
  id?:  number;
  name?: string;
  description?: string;
  rolesModules?: RolesModule[]
}

export interface RolesForModule {
  can_see: boolean;
  can_create?: boolean;
  can_edit?: boolean;
  can_delete: boolean;
}

export interface Module {
  id: number;
  name: string;
}

export interface RolesModule {
  modules_id?:     number;
  selectedValue?: SelectedValue[];
}

export interface SelectedValue {
  name?:  Name;
  value?: number;
}

export enum Name {
  Crear = "Crear",
  Editar = "Editar",
  Eliminar = "Eliminar",
  Ver = "Ver",
}