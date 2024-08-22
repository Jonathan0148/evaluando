export const setting = {
    items: [
        {
            label: 'Configuración',
            icon: 'pi pi-cog',
            items: [
                {
                    code: '01',
                    label: 'Roles',
                    icon: 'pi pi-fw pi-bookmark',
                    routerLink: [ '/admin/roles' ]
                },
                {
                    code: '03',
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
            icon: 'pi pi-cog',
            items: [
                {
                    code: '02',
                    label: 'Sedes',
                    icon: 'pi pi-fw pi-building',
                    routerLink: [ '/admin/sedes' ]
                },
                {
                    code: '04',
                    label: 'Tipos de Exámenes',
                    icon: 'pi pi-fw pi-users',
                    routerLink: [ '/admin/tipos-examenes' ]
                },
                {
                    code: '05',
                    label: 'Tipos de Resultados',
                    icon: 'pi pi-fw pi-users',
                    routerLink: [ '/admin/tipos-resultados' ]
                },
            ]
        }
    ]
};