import {
    Box,
    Typography,
} from '@mui/material';

import {
    Tablero,
} from '../definitions';

import TableroCard from './TableroCard';


async function getTableros(): Promise<Tablero[]> {
    const url =
        `${process.env.NEXT_PUBLIC_IMPLAN_CMS}` +
        `/tableros` +
        `?filters[activo][$eq]=true` +
        `&sort=createdAt:asc` +
        `&pagination[pageSize]=100`;

    const req = await fetch(url, {
        next: {
            revalidate: 3600,
        },
    });

    if (!req.ok) {
        throw new Error(
            `No se pudieron cargar los tableros (${req.status})`
        );
    }

    const response = await req.json();

    return response.data;
}


export default async function Tableros() {
    const tableros = await getTableros();

    const activos = tableros.filter(
        (tablero) => !tablero.enDesarrollo
    );

    const desarrollo = tableros.filter(
        (tablero) => tablero.enDesarrollo
    );

    return (
        <Box>
            {/* INTRODUCCIÓN */}
            <Box
                sx={{
                    mb: 5,
                    maxWidth: 850,
                }}
            >
                <Typography
                    sx={{
                        color: 'text.secondary',
                        lineHeight: 1.7,
                    }}
                >
                    Tableros interactivos de revisión, consulta y seguimiento
                    de los planes municipales.
                    <br />
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
                            <TableroCard
                                key={tablero.documentId ?? tablero.id}
                                tablero={tablero}
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
                            <TableroCard
                                key={tablero.documentId ?? tablero.id}
                                tablero={tablero}
                            />
                        ))}
                    </Box>
                </Box>
            )}
        </Box>
    );
}


function SectionTitle({
    children,
}: {
    children: React.ReactNode;
}) {
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