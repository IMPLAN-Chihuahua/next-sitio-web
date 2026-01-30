import { Box, Typography, Divider, Stack } from '@mui/material'
import React from 'react'

const Headline = () => {
    return (
        <Box sx={{ mb: 6, textAlign: 'center', maxWidth: 900, mx: 'auto', px: 2 }}>
            <Typography
                variant="h5" // Un poco más grande que overline
                component="h2"
                sx={{
                    color: '#1a202c', // Casi negro, muy elegante
                    fontWeight: 800, // Extra bold
                    letterSpacing: 0.5,
                    lineHeight: 1.3,
                    mb: 1,
                    textTransform: 'uppercase'
                }}
            >
                Consejo Municipal de Ordenamiento Territorial y Desarrollo Urbano
            </Typography>

            <Typography variant="button" display="block" color="text.disabled" sx={{ mb: 3, fontWeight: 'bold' }}>
                (ANTES CPUM)
            </Typography>

            <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                    fontWeight: 'normal',
                    lineHeight: 1.8,
                    fontSize: '1.1rem',
                    maxWidth: '80ch',
                    mx: 'auto'
                }}
            >
                Conoce a los representantes de los sectores <b>público</b>, <b>privado</b>, <b>social</b> y <b>académico</b> que colaboran en la planeación estratégica de nuestra ciudad.
            </Typography>
        </Box>
    )
}

export default Headline