'use client';

import { useId, useState } from 'react';
import NextLink from 'next/link';
import { AccountBalanceOutlined } from '@mui/icons-material';
import { Box, ButtonBase, Chip, Link, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { GrupoPlaneacion, NodoPlaneacion, sistemaPlaneacion } from '../data/sistema-planeacion';
import styles from './DiagramaPlaneacion.module.css';

const niveles = [
    {
        id: 'metropolitano',
        label: 'Metropolitano',
        title: 'Nivel metropolitano',
        color: '#875a19',
        row: 1,
        column: 2,
        radius: '0 100% 0 0',
        nodos: [sistemaPlaneacion.metropolitano],
    },
    {
        id: 'municipal',
        label: 'Municipal',
        title: 'Nivel municipal',
        color: '#17646a',
        row: 2,
        column: 2,
        radius: '0 0 100% 0',
        nodos: [sistemaPlaneacion.municipal],
    },
    {
        id: 'urbano',
        label: 'Centro de población',
        title: 'Centro de población',
        color: '#255a90',
        row: 2,
        column: 1,
        radius: '0 0 0 100%',
        nodos: sistemaPlaneacion.desarrolloUrbano,
    },
    {
        id: 'especificos',
        label: 'Instrumentos específicos',
        title: 'Instrumentos específicos',
        color: '#72456e',
        row: 1,
        column: 1,
        radius: '100% 0 0 0',
        nodos: sistemaPlaneacion.derivados,
    },
] as const;

function Nodo({ nodo, selected }: { nodo: NodoPlaneacion; selected: boolean }) {
    const development = nodo.estado === 'en_desarrollo';
    const className = `${styles.node} ${development ? styles.development : ''}`;
    const content = <>
        <Typography component="strong" variant="body2" fontWeight={600} color="text.primary">
            {nodo.titulo}
        </Typography>
        {nodo.subtitulo && <Typography component="span" variant="body2" color="text.secondary">{nodo.subtitulo}</Typography>}
        <Chip
            component="span"
            label={development ? 'En desarrollo' : 'Vigente'}
            size="small"
            sx={{
                height: 24,
                borderRadius: 1,
                typography: 'caption',
                bgcolor: development ? '#edf2f8' : '#edf4ed',
                color: development ? '#235b90' : '#286432',
            }}
        />
        {(nodo.url || nodo.grupo) && (
            <Typography component="span" variant="caption" fontWeight={600} color="primary.800">
                {nodo.url ? 'Ver estudio →' : selected ? 'Ver todos los instrumentos →' : 'Ver instrumentos →'}
            </Typography>
        )}
    </>;
    const href = nodo.url ?? (nodo.grupo
        ? `/planeacion?tab=sistemas-planeacion${selected ? '' : `&grupo=${nodo.grupo}`}#catalogo-instrumentos`
        : null);

    return href
        ? <Link component={NextLink} underline="none" color="text.primary" href={href} className={className} aria-current={selected ? 'true' : undefined}>{content}</Link>
        : <Box className={className}>{content}</Box>;
}

export default function RuedaPlaneacion({ grupo = null }: { grupo?: GrupoPlaneacion | null }) {
    const [selectedIndex, setSelectedIndex] = useState(grupo ? 3 : 2);
    const detailId = useId();
    const nivel = niveles[selectedIndex];

    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 1.1fr) minmax(0, 1fr)' }, gap: { xs: 3, md: 4 }, alignItems: 'center', mt: 3 }}>
            <Box>
                <Box
                    role="group"
                    aria-label="Niveles del sistema de planeación"
                    sx={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gridTemplateRows: 'repeat(2, minmax(0, 1fr))', gap: 1, width: '100%', maxWidth: 460, aspectRatio: '1', mx: 'auto' }}
                >
                    {niveles.map((item, index) => (
                        <ButtonBase
                            key={item.id}
                            type="button"
                            disableRipple
                            aria-pressed={selectedIndex === index}
                            aria-controls={detailId}
                            aria-label={`Nivel ${index + 1}: ${item.label}`}
                            onClick={() => setSelectedIndex(index)}
                            sx={{
                                gridRow: item.row,
                                gridColumn: item.column,
                                borderRadius: item.radius,
                                color: 'text.primary',
                                bgcolor: alpha(item.color, selectedIndex === index ? 0.19 : 0.10),
                                boxShadow: selectedIndex === index ? `inset 0 0 0 2px ${item.color}` : 'none',
                                '&:hover': { bgcolor: alpha(item.color, 0.23) },
                                '&.Mui-focusVisible .level-label': { outline: `3px solid ${item.color}`, outlineOffset: 3, borderRadius: 1 },
                            }}
                        >
                            <Stack component="span" alignItems="center" spacing={0.5} sx={{ width: '70%', maxWidth: 145 }}>
                                <Typography component="span" variant="body2" fontWeight={700} sx={{ color: item.color }}>
                                    {String(index + 1).padStart(2, '0')}
                                </Typography>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    fontWeight={600}
                                    className="level-label"
                                    sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, textDecoration: selectedIndex === index ? 'underline' : 'none', textUnderlineOffset: '4px' }}
                                >
                                    {item.label}
                                </Typography>
                            </Stack>
                        </ButtonBase>
                    ))}
                    <Stack
                        aria-hidden="true"
                        alignItems="center"
                        justifyContent="center"
                        spacing={0.5}
                        sx={{ position: 'absolute', inset: '29%', borderRadius: '50%', bgcolor: 'background.paper', boxShadow: theme => `0 0 0 8px ${theme.palette.background.paper}`, border: '1px solid', borderColor: 'divider', p: 0.5, textAlign: 'center' }}
                    >
                        <AccountBalanceOutlined sx={{ color: 'primary.800', fontSize: { xs: 20, sm: 28 } }} />
                        <Typography component="span" variant="body1" fontWeight={700} sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>Chihuahua</Typography>
                        <Typography component="span" variant="caption" color="text.secondary" sx={{ maxWidth: 90 }}>Sistema de planeación</Typography>
                    </Stack>
                </Box>
                <Typography variant="body2" color="text.secondary" textAlign="center" mt={2}>
                    Selecciona un nivel para explorar sus planes.
                </Typography>
            </Box>
            <Box component="section" id={detailId} aria-labelledby={`${detailId}-title`} sx={{ minWidth: 0 }}>
                <Box aria-live="polite" aria-atomic="true">
                    <Typography variant="overline" fontWeight={600} sx={{ color: nivel.color }}>
                        Nivel {String(selectedIndex + 1).padStart(2, '0')}
                    </Typography>
                    <Typography component="h4" variant="h6" fontWeight={600} id={`${detailId}-title`} mb={2}>
                        {nivel.title}
                    </Typography>
                </Box>
                <Stack spacing={1.5}>
                    {nivel.nodos.map(nodo => <Nodo key={nodo.id} nodo={nodo} selected={!!grupo && grupo === nodo.grupo} />)}
                </Stack>
            </Box>
        </Box>
    );
}
