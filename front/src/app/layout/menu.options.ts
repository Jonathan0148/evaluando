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
                    code: '02',
                    label: 'Sedes',
                    icon: 'pi pi-fw pi-building',
                    routerLink: [ '/admin/sedes' ]
                },
                {
                    code: '03',
                    label: 'Usuarios',
                    icon: 'pi pi-fw pi-users',
                    routerLink: [ '/admin/usuarios' ]
                },
                {
                    code: '14',
                    label: 'Encuestas',
                    icon: 'pi pi-fw pi-ticket',
                    routerLink: [ '/encuestas' ]
                },
                {
                    code: '14',
                    label: 'Calificaciones',
                    icon: 'pi pi-fw pi-check',
                    routerLink: [ '/respuestas' ]
                },
            ]
        }
    ]
};