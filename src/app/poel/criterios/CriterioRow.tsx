'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Chip, Collapse, IconButton, TableCell, TableRow, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { Criterio } from './types';
import { getCategoryColors } from './utils';

const MotionTableRow = motion.create(TableRow);

interface Props {
    criterio: Criterio;
    textoPlano: string;
}

export default function CriterioRow({ criterio, textoPlano }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <React.Fragment>
            <MotionTableRow
                hover
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.12, ease: 'easeOut' }}
                onClick={() => setOpen(!open)}
                sx={{ cursor: 'pointer', '& > *': { borderBottom: 'unset' }, bgcolor: open ? '#f4f4f7' : 'inherit', transition: 'background-color 0.2s ease' }}
            >
                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                    <Chip label={criterio.codigo} size="small" sx={{ bgcolor: '#202022', color: '#faf7cb', fontWeight: 700 }} />
                </TableCell>

                <TableCell>
                    {criterio.categoria?.nombre ? <Chip label={criterio.categoria.nombre} size="small" sx={{ ...getCategoryColors(criterio.categoria.nombre), fontWeight: 500 }} /> : '-'}
                </TableCell>

                <TableCell>
                    <Typography variant="body2" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {textoPlano}
                    </Typography>
                </TableCell>

                <TableCell align="right">
                    <IconButton
                        aria-label={open ? `Contraer detalle del criterio ${criterio.codigo}` : `Expandir detalle del criterio ${criterio.codigo}`}
                        aria-expanded={open}
                        size="small"
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpen(!open);
                        }}
                        sx={{ color: open ? '#e3a74d' : '#9d9d9f' }}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </MotionTableRow>

            <TableRow>
                <TableCell colSpan={4} sx={{ paddingBottom: 0, paddingTop: 0 }}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ m: 2, p: 3, bgcolor: '#fdfcea', borderRadius: 2, border: '1px solid #f7f1aa' }}>
                            <Typography variant="subtitle2" component="p" gutterBottom fontWeight={700} color="secondary.900">Descripción Completa</Typography>
                            <Typography variant="body2" color="text.primary" sx={{ whiteSpace: 'pre-wrap' }}>{textoPlano}</Typography>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
