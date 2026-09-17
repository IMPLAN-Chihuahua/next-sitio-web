import { Box, Typography } from '@mui/material';

import { Tablero } from '../definitions';

import CardTiles, { CardTilesAction, CardTilesImage } from '@/app/components/CardTiles';

const categorias: Record<string, string> = {
    'revision-opinion': 'REVISIÓN Y OPINIÓN',
    'indicadores': 'INDICADORES',
    'calculadora': 'CALCULADORA',
    'consulta': 'CONSULTA',
    'seguimiento': 'SEGUIMIENTO',
};


async function getTableros(): Promise<Tablero[]> {
    const url =
        `${process.env.NEXT_PUBLIC_IMPLAN_CMS}` +
        `/tableros` +
        `?populate=cover` +
        `&filters[activo][$eq]=true` +
        `&sort=createdAt:asc` +
        `&pagination[pageSize]=100`;

    const req = await fetch(url, {
        next: {
            revalidate: 1,
        },
    });

    if (!req.ok) {
        throw new Error(`No se pudieron cargar los tableros (${req.status})`);
    }

    const response = await req.json();

    return response.data;
}


export default async function Tableros() {
    const tableros = await getTableros();

    const activos = tableros.filter((tablero) => !tablero.enDesarrollo);

    const desarrollo = tableros.filter((tablero) => tablero.enDesarrollo);

    return (
        <Box>
            {/* INTRODUCCIÓN */}
            <Box sx={{
                pt: 2
            }}>
                <Typography sx={{ mb: 4, color: 'black' }} variant='h6'>
                    Tableros interactivos de revisión, consulta y seguimiento de los planes municipales.
                    Calculadoras y nuevos tableros en ArcGIS en desarrollo.
                </Typography>
            </Box>

            {/* ACTIVOS */}
            {activos.length > 0 && (
                <Box sx={{ mb: 6 }}>
                    <SectionTitle>
                        ACTIVOS
                    </SectionTitle>

                    <Box
                        sx={{
                            display: 'grid',

                            gridTemplateColumns: {
                                xs: '1fr',
                                md: 'repeat(2, minmax(0, 1fr))',
                                lg: 'repeat(3, minmax(0, 1fr))',
                            },

                            gap: 3,
                            mt: 2.5,
                        }}
                    >
                        {activos.map((tablero) => (
                            <CardTiles
                                key={tablero.documentId ?? tablero.id}
                                tipo="rectangular-horizontal"
                                title={tablero.titulo}
                                category={getTableroCategoria(tablero)}
                                description={tablero.descripcion}
                                image={getTableroImage(tablero)}
                                inactive={tablero.enDesarrollo}
                                contentSx={{ minHeight: tablero.cover?.url ? 185 : 215 }}
                                descriptionLineClamp={4}
                                action={getTableroAction(tablero)}
                            />
                        ))}
                    </Box>
                </Box>
            )}


            {/* EN DESARROLLO */}
            {desarrollo.length > 0 && (
                <Box>
                    <SectionTitle>
                        EN DESARROLLO
                    </SectionTitle>

                    <Box
                        sx={{
                            display: 'grid',

                            gridTemplateColumns: {
                                xs: '1fr',
                                md: 'repeat(2, minmax(0, 1fr))',
                                lg: 'repeat(3, minmax(0, 1fr))',
                            },

                            gap: 3,
                            mt: 2.5,
                        }}
                    >
                        {desarrollo.map((tablero) => (
                            <CardTiles
                                key={tablero.documentId ?? tablero.id}
                                tipo="rectangular-horizontal"
                                title={tablero.titulo}
                                category={getTableroCategoria(tablero)}
                                description={tablero.descripcion}
                                image={getTableroImage(tablero)}
                                inactive={tablero.enDesarrollo}
                                contentSx={{ minHeight: tablero.cover?.url ? 185 : 215 }}
                                descriptionLineClamp={4}
                                action={getTableroAction(tablero)}
                            />
                        ))}
                    </Box>
                </Box>
            )}
        </Box>
    );
}


const getTableroCategoria = (tablero: Tablero) => categorias[tablero.categoria] ?? tablero.categoria.toUpperCase();

const getTableroImage = (tablero: Tablero): CardTilesImage | undefined => {
    const coverUrl = tablero.cover?.url ? `${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${tablero.cover.url}` : null;

    return coverUrl ? { url: coverUrl, title: tablero.cover?.caption || tablero.titulo, alt: tablero.cover?.alternativeText || tablero.titulo } : undefined;
};

const getTableroAction = (tablero: Tablero): CardTilesAction | undefined => tablero.url ? { href: tablero.url, label: 'Abrir tablero', external: true } : undefined;

function SectionTitle({ children }: { children: React.ReactNode; }) {
    return (
        <Typography
            sx={{
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: 'text.secondary',
            }}
        >
            {children}
        </Typography>
    );
}
