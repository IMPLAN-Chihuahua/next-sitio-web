import { Box, Typography } from '@mui/material';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { GuiaManual } from '../definitions';

import GuiaManualCard from './GuiaManualCard';


async function getGuiasManuales(): Promise<GuiaManual[]> {
    const url =
        `${process.env.NEXT_PUBLIC_IMPLAN_CMS}` +
        `/guia-manuals` +
        `?populate=*` +
        `&filters[activo][$eq]=true` +
        `&sort=createdAt:asc` +
        `&pagination[pageSize]=100`;

    const req = await fetch(url, {
        next: {
            revalidate: 3600,
        },
    });

    if (!req.ok) {
        throw new Error(`No se pudieron cargar las guías y manuales (${req.status})`);
    }

    const response = await req.json();

    return response.data;
}


export default async function GuiasManuales() {
    const guias = await getGuiasManuales();

    const activos = guias.filter((guia) => !guia.enDesarrollo);

    const desarrollo = guias.filter((guia) => guia.enDesarrollo);

    return (
        <Box>
            {/* Introducción */}
            <Box sx={{
                pt: 2
            }}>
                <Typography sx={{ mb: 4, color: 'black' }} variant='h6'>
                    Guías y manuales de diseño urbano elaborados por IMPLAN Chihuahua. Estos materiales ofrecen criterios y lineamientos para orientar proyectos de urbanización, paisaje y equipamiento.

                </Typography>
            </Box>
            {/* Aviso */}

            {activos.length > 0 && (
                <GuidesSection title="ACTIVOS">
                    {activos.map((guia) => (
                        <GuiaManualCard key={guia.documentId ?? guia.id} guia={guia} />
                    ))}
                </GuidesSection>
            )}

            {desarrollo.length > 0 && (
                <GuidesSection title="EN DESARROLLO">
                    {desarrollo.map((guia) => (
                        <GuiaManualCard key={guia.documentId ?? guia.id} guia={guia} />
                    ))}
                </GuidesSection>
            )}
        </Box>
    );
}

function GuidesSection({ title, children }: { title: string; children: React.ReactNode; }) {
    return (
        <Box sx={{ mb: 6 }}>
            <Typography
                sx={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    color: 'text.secondary',
                }}
            >
                {title}
            </Typography>

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
                {children}
            </Box>
        </Box>
    );
}
