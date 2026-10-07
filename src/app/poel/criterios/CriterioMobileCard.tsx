'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Button, Chip, Collapse, IconButton, Paper, Stack, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { Criterio } from './types';
import { getCategoryColors } from './utils';

const MotionBox = motion.create(Box);

interface Props {
    criterio: Criterio;
    textoPlano: string;
}

export default function CriterioMobileCard({ criterio, textoPlano }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <MotionBox initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.12, ease: 'easeOut' }}>
            <Paper variant="outlined" sx={{ p: 2, borderColor: open ? '#f0d86d' : '#dfdfe1', bgcolor: open ? '#fffef3' : 'background.paper', transition: 'background-color 0.2s ease, border-color 0.2s ease' }}>
                <Stack direction="row" spacing={1.25} alignItems="flex-start" justifyContent="space-between">
                    <Stack spacing={1} sx={{ minWidth: 0 }}>
                        <Chip label={criterio.codigo} size="small" sx={{ alignSelf: 'flex-start', bgcolor: '#202022', color: '#faf7cb', fontWeight: 700 }} />
                        {criterio.categoria?.nombre ? (
                            <Chip label={criterio.categoria.nombre} size="small" sx={{ alignSelf: 'flex-start', maxWidth: '100%', ...getCategoryColors(criterio.categoria.nombre), fontWeight: 500 }} />
                        ) : null}
                    </Stack>

                    <IconButton
                        aria-label={open ? `Contraer detalle del criterio ${criterio.codigo}` : `Expandir detalle del criterio ${criterio.codigo}`}
                        aria-expanded={open}
                        size="small"
                        onClick={() => setOpen(!open)}
                        sx={{ flexShrink: 0, color: open ? '#e3a74d' : '#9d9d9f' }}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </Stack>

                <Typography variant="body2" color="text.secondary" onClick={() => setOpen(!open)} sx={{ mt: 1.5, display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.65, cursor: 'pointer' }}>
                    {textoPlano}
                </Typography>

                <Button size="small" color="inherit" onClick={() => setOpen(!open)} sx={{ mt: 1, px: 0, minWidth: 0, color: open ? '#c78222' : 'text.secondary', textTransform: 'none', fontWeight: 700 }}>
                    {open ? 'Ocultar detalle' : 'Ver detalle'}
                </Button>

                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ mt: 1.5, p: 2, bgcolor: '#fdfcea', borderRadius: 1, border: '1px solid #f7f1aa' }}>
                        <Typography variant="body2" color="text.primary" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>{textoPlano}</Typography>
                    </Box>
                </Collapse>
            </Paper>
        </MotionBox>
    );
}
