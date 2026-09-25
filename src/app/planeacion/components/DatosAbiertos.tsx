import {
    Box,
    CircularProgress,
    Typography
} from '@mui/material';

import { Suspense } from 'react';
import { visuallyHidden } from '@mui/utils';

import InstrumentosTiles from './Tiles';


export default function DatosAbiertos() {
    return (
        <>
            <Typography component="h2" sx={visuallyHidden}>Datos abiertos</Typography>
            <Box
                sx={{
                    pt: 2
                }}
            >
                <Typography
                    sx={{
                        mb: 4,
                        color: 'black'
                    }}
                    variant="h6"
                    component="p"
                >
                    Consulta y descarga información relacionada con los
                    instrumentos de planeación del municipio.
                </Typography>
            </Box>

            <Suspense
                fallback={
                    <Box
                        display="flex"
                        justifyContent="center"
                        py={10}
                    >
                        <CircularProgress aria-label="Cargando datos abiertos" />
                    </Box>
                }
            >

                <InstrumentosTiles
                    seccion="datos_abiertos"
                    incluirSinSeccion
                />
            </Suspense>
        </>
    );
}
