import React from 'react'
import { Box, Paper, Typography, Stack, Tooltip, IconButton } from '@mui/material'
import { Mic, HowToVote, Block } from '@mui/icons-material' // Iconos de Material UI
import { Consejero, SectorType } from '../definitions' // Asegúrate de que la ruta sea correcta

// Mapeo de colores por sector para la franja izquierda
const getSectorColor = (sector: string | null) => {
    if (!sector) return '#9e9e9e'; // Gris por defecto

    switch (sector) {
        case SectorType.SOCIAL:
            return '#2e7d32'; // Verde fuerte
        case SectorType.PUBLICO:
        case SectorType.PUBLICO_FEDERAL:
        case SectorType.PUBLICO_ESTATAL:
        case SectorType.PUBLICO_MUNICIPAL:
            return '#1565c0'; // Azul institucional
        case SectorType.PRIVADO:
            return '#d32f2f'; // Rojo/Vino
        case SectorType.TECNICO_ACADEMICO:
            return '#fbc02d'; // Amarillo/Dorado
        default:
            return '#9e9e9e';
    }
}

const ConsejoCard = ({ data }: { data: Consejero }) => {
    const sectorColor = getSectorColor(data.sector);

    // Lógica para el texto del Tooltip
    let statusText = "Sin voz ni voto";
    if (data.has_voice && data.can_vote) statusText = "Con voz y voto";
    else if (data.has_voice) statusText = "Solo voz";
    else if (data.can_vote) statusText = "Solo voto";

    return (
        <Paper
            elevation={2}
            sx={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6
                }
            }}
        >
            {/* Franja de color del Sector (Izquierda) */}
            <Box sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '6px',
                bgcolor: sectorColor,
                zIndex: 1
            }} />

            {/* Contenido Principal (Parte Blanca) */}
            <Box sx={{ pl: 3, pr: 2, pt: 2, pb: 2, flexGrow: 1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    {/* Nombre y Título */}
                    <Box sx={{ pr: 1 }}>
                        <Typography variant="subtitle1" fontWeight={800} lineHeight={1.2} sx={{ mb: 0.5, textTransform: 'uppercase' }}>
                            {data.nombre}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" lineHeight={1.3} sx={{ fontSize: '0.8rem' }}>
                            {data.title}
                        </Typography>
                        {/* Etiqueta del Sector (Opcional, visualmente ayuda) */}
                        <Typography variant="caption" sx={{ color: sectorColor, fontWeight: 'bold', fontSize: '0.65rem', mt: 1, display: 'block', textTransform: 'uppercase' }}>
                            {data.sector ? data.sector.replace('_', ' ') : ''}
                        </Typography>
                    </Box>

                    {/* Iconos de Estado (Voz/Voto) */}
                    <Tooltip title={statusText} arrow placement="top">
                        <Stack direction="row" spacing={0.5} sx={{ color: 'text.secondary', bgcolor: 'grey.100', borderRadius: 5, px: 1, py: 0.5 }}>
                            {data.has_voice ? (
                                <Mic sx={{ fontSize: 18 }} />
                            ) : (
                                <Mic sx={{ fontSize: 18, opacity: 0.3 }} />
                            )}

                            {data.can_vote ? (
                                <HowToVote sx={{ fontSize: 18 }} />
                            ) : (
                                <Block sx={{ fontSize: 18, opacity: 0.3 }} />
                            )}
                        </Stack>
                    </Tooltip>
                </Stack>
            </Box>

            {/* Sección Suplente (Parte Gris) */}
            {data.suplente && (
                <Box sx={{
                    bgcolor: '#f5f5f5', // Gris muy claro
                    px: 3, // Alineado con el padding de arriba (considerando la franja)
                    py: 1.5,
                    borderTop: '1px solid',
                    borderColor: 'grey.200'
                }}>
                    <Typography variant="caption" fontWeight="bold" color="text.secondary" display="block" sx={{ mb: 0 }}>
                        SUPLENTE
                    </Typography>
                    <Typography variant="body2" fontWeight={500} sx={{ fontSize: '0.85rem' }}>
                        {data.suplente}
                    </Typography>
                </Box>
            )}
            {/* Si no tiene suplente, renderizamos una caja vacía o con altura mínima para que las cards se alineen si usas grid masonery, 
                 pero con Flexbox normal esto es opcional */}
        </Paper>
    )
}

export default ConsejoCard