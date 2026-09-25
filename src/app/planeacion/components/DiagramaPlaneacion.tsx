'use client';

import { useState } from 'react';
import NextLink from 'next/link';
import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, Link, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { AccountTreeOutlined, ApartmentOutlined, ExpandMore, DomainOutlined, LayersOutlined, LocationCityOutlined } from '@mui/icons-material';
import styles from './DiagramaPlaneacion.module.css';
import { GrupoPlaneacion, NodoPlaneacion, sistemaPlaneacion } from '../data/sistema-planeacion';

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
                mt: 'auto',
                height: 24,
                borderRadius: 1,
                typography: 'caption',
                bgcolor: development ? '#edf2f8' : '#edf4ed',
                color: development ? '#235b90' : '#286432',
            }}
        />
        {(nodo.url || nodo.grupo) && (
            <Typography component="span" variant="caption" fontWeight={600} color="primary.800">
                {nodo.url ? 'Ver estudio →' : 'Ver instrumentos →'}
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

export default function DiagramaPlaneacion({ grupo = null }: { grupo?: GrupoPlaneacion | null }) {
    const [diagramOpen, setDiagramOpen] = useState(true);

    const renderNode = (nodo: NodoPlaneacion) => (
        <Nodo key={nodo.id} nodo={nodo} selected={!!grupo && grupo === nodo.grupo} />
    );

    return (
        <Accordion
            expanded={diagramOpen}
            onChange={(_, expanded) => setDiagramOpen(expanded)}
            disableGutters
            elevation={0}
            slotProps={{ heading: { component: 'h2' }, transition: { unmountOnExit: true } }}
            sx={{
                mb: 1,
                minWidth: 0,
                border: '1px solid',
                borderColor: 'secondary.main',
                borderRadius: '12px !important',
                overflow: 'hidden',
                bgcolor: 'background.paper',
                '&::before': { display: 'none' },
            }}
        >
            <AccordionSummary
                id="diagrama-planeacion-header"
                aria-controls="diagrama-planeacion"
                expandIcon={<ExpandMore sx={{ color: 'primary.800' }} />}
                sx={{
                    px: { xs: 2, sm: 2.5 },
                    py: 0.5,
                    minHeight: 80,
                    bgcolor: theme => alpha(theme.palette.secondary.main, 0.14),
                    borderLeft: '4px solid',
                    borderLeftColor: 'secondary.main',
                    '&:hover': { bgcolor: theme => alpha(theme.palette.secondary.main, 0.22) },
                    '&.Mui-focusVisible': { bgcolor: theme => alpha(theme.palette.secondary.main, 0.25) },
                    '& .MuiAccordionSummary-content': { alignItems: 'center', gap: 1.5, my: 1.5 },
                }}
            >
                <AccountTreeOutlined sx={{ color: 'primary.800', fontSize: 28, flexShrink: 0 }} />
                <Box component="span" sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, flex: 1 }}>
                    <Typography component="span" variant="body1" fontWeight={600}>
                        Sistema de planeación
                    </Typography>
                    <Typography component="span" variant="body2" color="text.secondary">
                        Conoce cómo se conectan los planes del municipio.
                    </Typography>
                    <Typography component="span" variant="body2" fontWeight={600} color="primary.800" sx={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                        {diagramOpen ? 'Ocultar diagrama' : 'Mostrar diagrama'}
                    </Typography>
                </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ p: { xs: 2, sm: 2.5 } }}>
                <Typography component="h3" variant="h6" fontWeight={600} mb={0.75}>
                    ¿Cómo se organiza la planeación?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Municipio de Chihuahua · Del territorio a los planes específicos.
                </Typography>
                <Box component="nav" aria-label="Diagrama del sistema de planeación">
                    <Box component="ol" className={styles.levels}>
                        <Box component="li" className={styles.level}>
                            <Typography component="h4" variant="body2" fontWeight={600} className={styles.levelTitle}>
                                <DomainOutlined aria-hidden="true" />01 · Nivel metropolitano
                            </Typography>
                            {renderNode(sistemaPlaneacion.metropolitano)}
                        </Box>
                        <Box component="li" className={styles.level}>
                            <Typography component="h4" variant="body2" fontWeight={600} className={styles.levelTitle}>
                                <LocationCityOutlined aria-hidden="true" />02 · Nivel municipal
                            </Typography>
                            {renderNode(sistemaPlaneacion.municipal)}
                        </Box>
                        <Box component="li" className={styles.level}>
                            <Typography component="h4" variant="body2" fontWeight={600} className={styles.levelTitle}>
                                <ApartmentOutlined aria-hidden="true" />03 · Centro de población
                            </Typography>
                            <Box className={styles.versions}>{sistemaPlaneacion.desarrolloUrbano.map(renderNode)}</Box>
                        </Box>
                        <Box component="li" className={styles.level}>
                            <Typography component="h4" variant="body2" fontWeight={600} className={styles.levelTitle}>
                                <LayersOutlined aria-hidden="true" />04 · Instrumentos específicos
                            </Typography>
                            <Box className={styles.branches}>{sistemaPlaneacion.derivados.map(renderNode)}</Box>
                        </Box>
                    </Box>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
}
