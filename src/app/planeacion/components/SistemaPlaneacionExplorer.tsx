'use client';

import NextLink from 'next/link';
import { Box, Link, Stack, Typography } from '@mui/material';
import InstrumentosTiles from './Tiles';
import { GrupoPlaneacion, sistemaPlaneacion } from '../data/sistema-planeacion';

export default function SistemaPlaneacionExplorer({ grupo = null }: { grupo?: GrupoPlaneacion | null }) {
    return (
        <Box
            component="section"
            id="catalogo-instrumentos"
            aria-label="Catálogo de instrumentos"
            sx={{ mb: 8, minWidth: 0, scrollMarginTop: '104px' }}
        >
            <Box>
                <Typography component="h2" sx={{ mb: 1.25, fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.4 }}>
                    Instrumentos de planeación
                </Typography>
                <Typography sx={{ color: '#606062', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    Consulta los estudios y documentos del municipio.
                </Typography>
            </Box>
            {grupo && (
                <Stack
                    direction="row"
                    role="status"
                    sx={{
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 1.5,
                        mt: 2,
                        py: 1.25,
                        px: 1.5,
                        borderRadius: '6px',
                        bgcolor: '#edf5ee',
                        color: '#174d25',
                        fontSize: '0.8rem',
                    }}
                >
                    <Typography component="span" variant="inherit">
                        {sistemaPlaneacion.derivados.find(item => item.grupo === grupo)?.titulo}
                    </Typography>
                    <Link
                        component={NextLink}
                        color="inherit"
                        variant="inherit"
                        underline="always"
                        href="/planeacion?tab=sistemas-planeacion#catalogo-instrumentos"
                    >
                        Ver todos ×
                    </Link>
                </Stack>
            )}
            <InstrumentosTiles
                key={grupo ?? 'todos'}
                seccion="sistema_planeacion"
                grupo={grupo}
            />
        </Box>
    );
}
