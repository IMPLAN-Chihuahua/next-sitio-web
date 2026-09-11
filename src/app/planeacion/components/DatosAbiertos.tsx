import { Box, CircularProgress, Typography } from '@mui/material';

import { Suspense } from 'react';

import InstrumentosTiles from './Tiles';

export default function DatosAbiertos() {
    return (
        <>
            <Box sx={{
                pt: 2
            }}>
                <Typography sx={{ mb: 4, color: 'black' }} variant='h6'>
                    Consulta y descarga información relacionada con los
                    instrumentos de planeación del municipio.
                </Typography>
            </Box>

            <Suspense
                fallback={
                    <Box display="flex" justifyContent="center" py={10}>
                        <CircularProgress />
                    </Box>
                }
            >
                <InstrumentosTiles />
            </Suspense>
        </>
    );
}
