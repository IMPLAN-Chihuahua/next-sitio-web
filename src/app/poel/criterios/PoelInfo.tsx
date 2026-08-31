'use client';

import { useState } from 'react';

import {
    Box,
    Button,
    Collapse,
    Paper,
    Stack,
    Typography,
} from '@mui/material';

import LandscapeOutlinedIcon from '@mui/icons-material/LandscapeOutlined';
import TrackChangesOutlinedIcon from '@mui/icons-material/TrackChangesOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

const alcances = [
    'Ordenamiento del territorio',
    'Conservación de recursos naturales',
    'Regulación de actividades productivas',
    'Restauración ambiental',
    'Adaptación al cambio climático',
];

const componentes = [
    'Regionalización de las UGA',
    'Políticas Ambientales',
    'Lineamientos Ecológicos',
    'Usos del Suelo',
    'Criterios de Regulación Ecológica (CRE)',
];

interface InfoListProps {
    title: string;
    items: string[];
    color: string;
    icon: React.ReactNode;
}

function InfoList({
    title,
    items,
    color,
    icon,
}: InfoListProps) {
    return (
        <Paper
            variant="outlined"
            sx={{
                p: {
                    xs: 2,
                    md: 2.5,
                },
                borderRadius: 3,
                bgcolor: 'background.paper',
                height: '100%',
            }}
        >
            <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                mb={1.5}
            >
                <Box
                    sx={{
                        color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',

                        '& svg': {
                            fontSize: 28,
                        },
                    }}
                >
                    {icon}
                </Box>

                <Typography
                    variant="subtitle1"
                    component="p"
                    fontWeight={700}
                >
                    {title}
                </Typography>
            </Stack>

            <Stack>
                {items.map((item, index) => (
                    <Box
                        key={item}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            py: 1,

                            '&:not(:last-of-type)': {
                                borderBottom: '1px solid',
                                borderColor: 'divider',
                            },
                        }}
                    >
                        <Box
                            sx={{
                                width: 24,
                                height: 24,
                                flexShrink: 0,
                                borderRadius: '50%',
                                bgcolor: color,
                                color: '#fff',

                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',

                                fontSize: '0.75rem',
                                fontWeight: 700,
                            }}
                        >
                            {index + 1}
                        </Box>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {item}
                        </Typography>
                    </Box>
                ))}
            </Stack>
        </Paper>
    );
}

export default function PoelInfo() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Paper
            variant="outlined"
            sx={{
                mt: 3,
                mb: 2.5,

                borderRadius: 4,

                borderColor: 'rgba(25, 118, 210, 0.18)',

                overflow: 'hidden',

                background:
                    'linear-gradient(135deg, rgba(25,118,210,0.045) 0%, rgba(255,255,255,1) 50%, rgba(217,154,27,0.025) 100%)',

                transition: 'all 0.2s ease',
            }}
        >
            {/* Barra superior que SIEMPRE permanece visible */}
            <Box
                sx={{
                    px: {
                        xs: 2,
                        sm: 3,
                    },
                    py: collapsed ? 1.5 : 2,

                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2,
                }}
            >
                {/* Cuando está colapsado mostramos título compacto */}
                {collapsed ? (
                    <Stack
                        direction="row"
                        spacing={1.5}
                        alignItems="center"
                        sx={{
                            minWidth: 0,
                        }}
                    >
                        <Box
                            sx={{
                                width: 38,
                                height: 38,
                                borderRadius: '50%',

                                bgcolor: 'rgba(25, 118, 210, 0.07)',

                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',

                                color: 'primary.main',
                                flexShrink: 0,
                            }}
                        >
                            <LandscapeOutlinedIcon fontSize="small" />
                        </Box>

                        <Box sx={{ minWidth: 0 }}>
                            <Typography
                                fontWeight={700}
                                sx={{
                                    lineHeight: 1.2,
                                }}
                            >
                                Programa de Ordenamiento Ecológico Local
                            </Typography>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                POEL 2019 · Municipio de Chihuahua
                            </Typography>
                        </Box>
                    </Stack>
                ) : (
                    /*
                     * Este espacio evita duplicar el título,
                     * porque cuando está abierto el título grande
                     * aparece dentro del contenido.
                     */
                    <Box />
                )}

                <Button
                    size="small"
                    onClick={() => setCollapsed((prev) => !prev)}
                    endIcon={
                        collapsed ? (
                            <KeyboardArrowDownRoundedIcon />
                        ) : (
                            <KeyboardArrowUpRoundedIcon />
                        )
                    }
                    aria-expanded={!collapsed}
                    sx={{
                        flexShrink: 0,

                        textTransform: 'none',
                        fontWeight: 600,

                        color: 'text.secondary',

                        px: 1.25,

                        '&:hover': {
                            bgcolor: 'action.hover',
                            color: 'primary.main',
                        },
                    }}
                >
                    {collapsed ? 'Mostrar' : 'Colapsar'}
                </Button>
            </Box>

            {/* TODO el contenido colapsable */}
            <Collapse
                in={!collapsed}
                timeout={300}
            >
                <Box
                    sx={{
                        px: {
                            xs: 2,
                            sm: 3,
                        },
                        pb: {
                            xs: 2,
                            sm: 3,
                        },
                    }}
                >
                    {/* Encabezado principal */}
                    <Box
                        sx={{
                            display: 'grid',

                            gridTemplateColumns: {
                                xs: '1fr',
                                sm: '100px 1fr',
                            },

                            gap: {
                                xs: 2,
                                sm: 3,
                            },

                            alignItems: 'start',
                        }}
                    >
                        {/* Ícono */}
                        <Box
                            sx={{
                                width: {
                                    xs: 76,
                                    sm: 100,
                                },

                                height: {
                                    xs: 76,
                                    sm: 100,
                                },

                                borderRadius: '50%',

                                bgcolor: 'rgba(25, 118, 210, 0.06)',

                                border: '1px solid',
                                borderColor: 'rgba(25, 118, 210, 0.12)',

                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',

                                color: 'primary.main',
                            }}
                        >
                            <LandscapeOutlinedIcon
                                sx={{
                                    fontSize: {
                                        xs: 42,
                                        sm: 54,
                                    },
                                }}
                            />
                        </Box>

                        {/* Texto */}
                        <Box>
                            <Typography
                                component="h2"
                                sx={{
                                    fontSize: {
                                        xs: '1.35rem',
                                        md: '1.65rem',
                                    },

                                    fontWeight: 800,
                                    lineHeight: 1.2,

                                    mb: 0.5,

                                    color: 'text.primary',
                                }}
                            >
                                Programa de Ordenamiento Ecológico Local
                            </Typography>

                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'text.secondary',
                                    fontWeight: 500,
                                    mb: 2,
                                }}
                            >
                                del Municipio de Chihuahua (POEL 2019),
                                publicado en la Gaceta Municipal No. 62 del 15
                                de abril de 2019.
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    lineHeight: 1.75,
                                }}
                            >
                                El Programa de Ordenamiento Ecológico Local del
                                Municipio de Chihuahua (POEL) es un instrumento
                                de política ambiental orientado a regular e
                                inducir el uso del suelo y las actividades
                                productivas en el territorio municipal. Su
                                finalidad es proteger el medio ambiente,
                                preservar los recursos naturales y promover su
                                aprovechamiento sustentable, con base en el
                                análisis de las características ambientales,
                                las tendencias de deterioro y las potencialidades
                                del municipio. Para ello, organiza el territorio
                                en{' '}
                                <Box
                                    component="span"
                                    sx={{
                                        color: 'text.primary',
                                        fontWeight: 700,
                                    }}
                                >
                                    138 Unidades de Gestión Ambiental (UGA)
                                </Box>
                                , en las que se definen políticas ambientales,
                                lineamientos ecológicos, usos del suelo
                                compatibles y criterios de regulación ecológica
                                para orientar el desarrollo sostenible.
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    lineHeight: 1.75,
                                    mt: 1,
                                }}
                            >
                                En conjunto, el POEL establece una base técnica
                                y normativa para orientar decisiones públicas y
                                privadas sobre el territorio municipal.
                            </Typography>
                        </Box>
                    </Box>

                    {/* Listas */}
                    <Box
                        sx={{
                            mt: 3,

                            display: 'grid',

                            gridTemplateColumns: {
                                xs: '1fr',
                                md: '1fr 1fr',
                            },

                            gap: 2,
                        }}
                    >
                        <InfoList
                            title="Alcances estratégicos del POEL"
                            items={alcances}
                            color="#D99A1B"
                            icon={<TrackChangesOutlinedIcon />}
                        />

                        <InfoList
                            title="Componentes principales para la gestión territorial"
                            items={componentes}
                            color="#1976D2"
                            icon={<AssignmentOutlinedIcon />}
                        />
                    </Box>
                </Box>
            </Collapse>
        </Paper>
    );
}
