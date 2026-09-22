import {
    Box,
    CircularProgress,
    Typography
} from '@mui/material';

import { Suspense } from 'react';

import SistemaPlaneacionExplorer from './SistemaPlaneacionExplorer';


export default function SistemaPlaneacion() {
    return (
        <>
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
                >
                    Conoce los instrumentos que integran el Sistema de Planeación
                    del Municipio de Chihuahua.
                </Typography>
            </Box>

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

                <SistemaPlaneacionExplorer />
            </Suspense>
        </>
    );
}
