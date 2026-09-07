import {
    Box,
    Typography,
} from '@mui/material';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import {
    GuiaManual,
} from '../definitions';

import GuiaManualCard from './GuiaManualCard';


async function getGuiasManuales(): Promise<GuiaManual[]> {
    const url =
        `${process.env.NEXT_PUBLIC_IMPLAN_CMS}` +
        `/guia-manuals` +
        `?populate=documento` +
        `&filters[activo][$eq]=true` +
        `&sort=createdAt:asc` +
        `&pagination[pageSize]=100`;

    const req = await fetch(url, {
        next: {
            revalidate: 3600,
        },
    });

    if (!req.ok) {
        throw new Error(
            `No se pudieron cargar las guías y manuales (${req.status})`
        );
    }

    const response = await req.json();

    return response.data;
}


export default async function GuiasManuales() {
    const guias = await getGuiasManuales();

    return (
        <Box>
            {/* Introducción */}
            <Typography
                sx={{
                    maxWidth: 850,
                    color: 'text.secondary',
                    fontSize: '0.95rem',
                    lineHeight: 1.7,
                    mb: 2,
                }}
            >
                Guías y manuales de diseño urbano elaborados por
                IMPLAN Chihuahua. Estos materiales ofrecen criterios
                y lineamientos para orientar proyectos de
                urbanización, paisaje y equipamiento.
            </Typography>

            {/* Aviso */}
            <Box
                sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,

                    px: 1.5,
                    py: 0.8,

                    bgcolor: '#f4f4f6',
                    borderRadius: 1.5,

                    color: 'text.secondary',
                    mb: 4,
                }}
            >
                <InfoOutlinedIcon
                    sx={{
                        fontSize: 16,
                    }}
                />

                <Typography
                    sx={{
                        fontSize: '0.75rem',
                    }}
                >
                    Esta sección podría integrarse con guías de otras
                    categorías o migrar hacia Lineamientos.
                </Typography>
            </Box>

            {/* Tarjetas */}
            <Box
                sx={{
                    display: 'grid',

                    gridTemplateColumns: {
                        xs: '1fr',
                        md: 'repeat(2, 1fr)',
                    },

                    gap: 2.5,
                    maxWidth: 1050,
                }}
            >
                {guias.map((guia) => (
                    <GuiaManualCard
                        key={guia.documentId ?? guia.id}
                        guia={guia}
                    />
                ))}
            </Box>

            {/* Materiales futuros */}
            <Box
                sx={{
                    maxWidth: 1050,

                    mt: 3,

                    px: 2.5,
                    py: 2,

                    bgcolor: '#fafafa',

                    border: '1px dashed',
                    borderColor: 'divider',

                    borderRadius: 2,
                }}
            >
                <Typography
                    sx={{
                        fontSize: '0.72rem',
                        fontWeight: 700,

                        letterSpacing: '0.08em',

                        color: 'text.secondary',

                        mb: 0.7,
                    }}
                >
                    MATERIALES FUTUROS
                </Typography>

                <Typography
                    sx={{
                        fontSize: '0.8rem',
                        lineHeight: 1.6,

                        color: 'text.secondary',
                    }}
                >
                    Se explorarán guías adicionales, manuales de
                    procedimientos y eventualmente lineamientos
                    normativos que puedan evolucionar desde esta
                    sección.
                </Typography>
            </Box>
        </Box>
    );
}