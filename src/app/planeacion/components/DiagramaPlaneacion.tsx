'use client';

import { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { AccountTreeOutlined, ExpandMore } from '@mui/icons-material';
import RuedaPlaneacion from './RuedaPlaneacion';
import type { GrupoPlaneacion } from '../data/sistema-planeacion';

export default function DiagramaPlaneacion({ grupo = null }: { grupo?: GrupoPlaneacion | null }) {
    const [diagramOpen, setDiagramOpen] = useState(true);

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
                <RuedaPlaneacion grupo={grupo} />
            </AccordionDetails>
        </Accordion>
    );
}
