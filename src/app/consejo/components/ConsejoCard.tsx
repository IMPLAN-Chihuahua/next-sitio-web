import React from 'react'
import { Box, Paper, Typography, Stack, Tooltip } from '@mui/material'
import { Mic, HowToVote, Block } from '@mui/icons-material'
import { Consejero, SectorType } from '../definitions'

const getSectorColor = (sector: string | null) => {
    if (!sector) return '#9e9e9e'

    switch (sector) {
        case SectorType.SOCIAL:
            return '#2E7D32'

        case SectorType.PUBLICO:
            return '#1565C0'

        case SectorType.PUBLICO_FEDERAL:
            return '#0288D1'

        case SectorType.PUBLICO_ESTATAL:
            return '#1976D2'

        case SectorType.PUBLICO_MUNICIPAL:
            return '#0D47A1'

        case SectorType.PRIVADO:
            return '#D32F2F'

        case SectorType.TECNICO_ACADEMICO:
            return '#F9A825'

        default:
            return '#9e9e9e'
    }
}

const formatSector = (sector: string | null) => {
    if (!sector) return ''

    return sector.replaceAll('_', ' ')
}

const ConsejoCard = ({ data }: { data: Consejero }) => {
    const sectorColor = getSectorColor(data.sector)

    let statusText = 'Sin voz ni voto'

    if (data.has_voice && data.can_vote) statusText = 'Con voz y voto'
    else if (data.has_voice) statusText = 'Solo voz'
    else if (data.can_vote) statusText = 'Solo voto'

    return (
        <Paper
            elevation={1}
            sx={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100%',
                minHeight: 235,
                bgcolor: 'white',
                border: '1px solid',
                borderColor: 'grey.200',
                boxShadow: '0 3px 10px rgba(0, 0, 0, 0.08)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)',
                },
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '6px',
                    bgcolor: sectorColor,
                    zIndex: 1,
                }}
            />

            <Box
                sx={{
                    pl: 3,
                    pr: 2,
                    pt: 2,
                    pb: 1.5,
                    flex: 1,
                    minHeight: 0,
                }}
            >
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={1.5}
                    sx={{ height: '100%' }}
                >
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography
                            variant="subtitle1"
                            component="h2"
                            fontWeight={900}
                            lineHeight={1.15}
                            sx={{
                                mb: 0.6,
                                textTransform: 'uppercase',
                                color: '#111827',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                            }}
                        >
                            {data.nombre}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            lineHeight={1.35}
                            sx={{
                                fontSize: '0.82rem',
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                            }}
                        >
                            {data.title}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                            <Box
                                sx={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: '50%',
                                    bgcolor: sectorColor
                                }}
                            />
                            <Typography
                                variant="caption"
                                sx={{
                                    color: 'text.secondary',
                                    fontWeight: 900,
                                    fontSize: '0.68rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: 0.2,
                                }}
                            >
                                {formatSector(data.sector)}
                            </Typography>
                        </Box>
                    </Box>

                    <Tooltip title={statusText} arrow placement="top">
                        <Stack
                            role='group'
                            direction="row"
                            spacing={0.5}
                            sx={{
                                flexShrink: 0,
                                color: 'text.secondary',
                                bgcolor: 'grey.100',
                                borderRadius: 999,
                                px: 1,
                                py: 0.5,
                            }}
                        >
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

            <Box
                sx={{
                    mt: 'auto',
                    bgcolor: '#f5f5f5',
                    px: 3,
                    py: 1.5,
                    borderTop: '1px solid',
                    borderColor: 'grey.200',
                    minHeight: 66,
                }}
            >
                {data.suplente ? (
                    <>
                        <Typography
                            variant="caption"
                            fontWeight={900}
                            color="text.secondary"
                            display="block"
                            sx={{ mb: 0.2 }}
                        >
                            SUPLENTE
                        </Typography>

                        <Typography
                            variant="body2"
                            fontWeight={500}
                            sx={{
                                fontSize: '0.85rem',
                                lineHeight: 1.25,
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                            }}
                        >
                            {data.suplente}
                        </Typography>
                    </>
                ) : (
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontWeight: 700 }}
                    >
                        SIN SUPLENTE
                    </Typography>
                )}
            </Box>
        </Paper>
    )
}

export default ConsejoCard