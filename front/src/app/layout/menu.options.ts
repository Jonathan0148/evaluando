export const setting = {
    items: [
        {
            label: 'Configuración',
            icon: 'pi pi-cog',
            items: [
                {
                    code: '02',
                    label: 'Roles',
                    icon: 'pi pi-fw pi-bookmark',
                    routerLink: [ '/admin/roles' ]
                },
                {
                    code: '01',
                    label: 'Usuarios',
                    icon: 'pi pi-fw pi-users',
                    routerLink: [ '/admin/usuarios' ]
                },
            ]
        }
    ]
};

export const administration = {
    items: [
        {
            label: 'Administración',
            icon: 'pi pi-book',
            items: [
                {
                    code: '03',
                    label: 'Sedes',
                    icon: 'pi pi-fw pi-building',
                    routerLink: [ '/admin/sedes' ]
                },
                {
                    code: '04',
                    label: 'Tipos de Exámenes',
                    icon: 'pi pi-fw pi-list',
                    routerLink: [ '/admin/tipos-examenes' ]
                },
                {
                    code: '05',
                    label: 'Tipos de Resultados',
                    icon: 'pi pi-fw pi-check',
                    routerLink: [ '/admin/tipos-resultados' ]
                },
                {
                    code: '06',
                    label: 'Pacientes',
                    icon: 'pi pi-fw pi-user',
                    routerLink: [ '/admin/pacientes' ]
                },
                {
                    code: '09',
                    label: 'Servicios',
                    icon: 'pi pi-fw pi-bookmark',
                    routerLink: [ '/admin/servicios' ]
                },
                {
                    code: '11',
                    label: 'Bandeja de Mensajes',
                    icon: 'pi pi-fw pi-envelope',
                    routerLink: [ '/admin/mensajes' ]
                },
            ]
        }
    ]
};

export const reports = {
    items: [
        {
            label: 'Reportes',
            icon: 'pi pi-list',
            items: [
                {
                    code: '10',
                    label: 'Reportes por fechas',
                    icon: 'pi pi-fw pi-calendar',
                    routerLink: [ '/admin/reportes' ]
                },
            ]
        }
    ]
};