export type GrupoPlaneacion = 'parciales' | 'sectoriales' | 'maestros';

export type NodoPlaneacion = {
    id: string;
    titulo: string;
    subtitulo?: string;
    estado: 'vigente' | 'en_desarrollo';
    url?: string;
    grupo?: GrupoPlaneacion;
};

// Configuración inicial. Estos mismos campos pueden administrarse en Strapi
// mediante un componente repetible; las URL apuntan a fichas publicadas.
export const sistemaPlaneacion: {
    metropolitano: NodoPlaneacion;
    municipal: NodoPlaneacion;
    desarrolloUrbano: NodoPlaneacion[];
    derivados: NodoPlaneacion[];
} = {
    metropolitano: {
        id: 'metropolitano',
        titulo: 'Planes de zonas metropolitanas y áreas conurbadas',
        estado: 'vigente',
        url: '/planeacion-vertical/programa-de-ordenamiento-de-la-zona-metropolitana-chihuahua',
    },
    municipal: {
        id: 'pmotdu',
        titulo: 'PMOTDU',
        subtitulo: 'Plan Municipal de Ordenamiento Territorial y Desarrollo Urbano',
        estado: 'en_desarrollo',
    },
    desarrolloUrbano: [
        {
            id: 'pdu-desarrollo',
            titulo: 'Plan de Desarrollo Urbano del Centro de Población',
            estado: 'en_desarrollo',
        },
        {
            id: 'pdu-vigente',
            titulo: 'Plan de Desarrollo Urbano del Centro de Población',
            estado: 'vigente',
            url: '/planeacion-vertical/pdu-2040-7ma-actualizacion',
        },
    ],
    derivados: [
        { id: 'parciales', titulo: 'Planes parciales', estado: 'vigente', grupo: 'parciales' },
        { id: 'sectoriales', titulo: 'Programas sectoriales', estado: 'vigente', grupo: 'sectoriales' },
        { id: 'maestros', titulo: 'Planes maestros', estado: 'vigente', grupo: 'maestros' },
    ],
};
