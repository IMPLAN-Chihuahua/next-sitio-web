import {
    Box,
    CircularProgress,
    Typography,
} from '@mui/material';

import { Suspense } from 'react';

import { SubtitleH2 } from '../../components/Titles';
import InstrumentosTiles from './Tiles';

export default function DatosAbiertos() {
    return (
        <>
            <SubtitleH2 title="Datos Abiertos" />

            <Typography sx={{ mb: 4 }}>
                Consulta y descarga información relacionada con los
                instrumentos de planeación del municipio.
            </Typography>

            <Suspense
                fallback={
                    <Box
                        display="flex"
                        justifyContent="center"
                        py={10}
                    >
                        <CircularProgress />
                    </Box>
                }
            >
                <InstrumentosTiles />
            </Suspense>
        </>
    );
}