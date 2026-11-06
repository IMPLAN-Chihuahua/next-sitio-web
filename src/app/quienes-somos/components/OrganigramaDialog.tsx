'use client';

import { useRef, useState } from 'react';
import { Box, Dialog, IconButton, Tooltip, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import RemoveIcon from '@mui/icons-material/Remove';
import Image from 'next/image';

type Props = {
    open: boolean;
    onClose: () => void;
    src: string;
    imagePath: string;
};

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.25;

export default function OrganigramaDialog({ open, onClose, src, imagePath }: Props) {
    const [zoom, setZoom] = useState(MIN_ZOOM);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const drag = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);

    const changeZoom = (nextZoom: number) => {
        const clamped = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, nextZoom));
        setZoom(clamped);
        if (clamped === MIN_ZOOM) setPan({ x: 0, y: 0 });
    };

    const close = () => {
        drag.current = null;
        setZoom(MIN_ZOOM);
        setPan({ x: 0, y: 0 });
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={close}
            maxWidth={false}
            fullWidth
            aria-labelledby="organigrama-title"
            slotProps={{
                paper: {
                    sx: {
                        m: { xs: 1, sm: 3 },
                        width: { xs: 'calc(100% - 16px)', sm: 'calc(100% - 48px)' },
                        maxWidth: 1500,
                        height: { xs: 'calc(100dvh - 16px)', sm: 'calc(100dvh - 48px)' },
                        maxHeight: 1000,
                        bgcolor: '#111',
                        color: '#fff',
                        borderRadius: 1,
                        overflow: 'hidden',
                    },
                },
            }}
        >
            <Box sx={{ height: 48, px: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
                <Typography id="organigrama-title" variant="caption" sx={{ color: '#fff', fontWeight: 700, letterSpacing: '0.12em' }}>
                    ORGANIGRAMA
                </Typography>
                <Tooltip title="Cerrar">
                    <IconButton onClick={close} aria-label="Cerrar organigrama" size="small" sx={{ color: '#fff' }}>
                        <CloseIcon />
                    </IconButton>
                </Tooltip>
            </Box>

            <Box
                onWheel={(event) => {
                    event.preventDefault();
                    changeZoom(zoom + (event.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP));
                }}
                onPointerDown={(event) => {
                    if (zoom === MIN_ZOOM) return;
                    drag.current = { x: event.clientX, y: event.clientY, panX: pan.x, panY: pan.y };
                    event.currentTarget.setPointerCapture(event.pointerId);
                }}
                onPointerMove={(event) => {
                    if (!drag.current) return;
                    setPan({
                        x: drag.current.panX + event.clientX - drag.current.x,
                        y: drag.current.panY + event.clientY - drag.current.y,
                    });
                }}
                onPointerUp={() => { drag.current = null; }}
                onPointerCancel={() => { drag.current = null; }}
                sx={{
                    mx: { xs: 1, sm: 1.5 },
                    flex: 1,
                    minHeight: 0,
                    position: 'relative',
                    overflow: 'hidden',
                    bgcolor: '#fff',
                    cursor: zoom > MIN_ZOOM ? 'grab' : 'default',
                    touchAction: zoom > MIN_ZOOM ? 'none' : 'auto',
                }}
            >
                <Image
                    src={src}
                    alt="Organigrama del Instituto IMPLAN"
                    fill
                    unoptimized
                    draggable={false}
                    style={{
                        objectFit: 'contain',
                        transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                        transformOrigin: 'center center',
                        userSelect: 'none',
                        pointerEvents: 'none',
                    }}
                />
            </Box>

            <Box sx={{ minHeight: 52, px: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, flexShrink: 0 }}>
                <Typography variant="caption" sx={{ color: '#d5d5d5', letterSpacing: '0.06em', display: { xs: 'none', sm: 'block' } }}>
                    IMPLAN / ESTRUCTURA INSTITUCIONAL
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.25, sm: 0.75 }, ml: 'auto' }}>
                    <Tooltip title="Alejar">
                        <span><IconButton onClick={() => changeZoom(zoom - ZOOM_STEP)} disabled={zoom === MIN_ZOOM} aria-label="Alejar" size="small" sx={{ color: '#fff', '&.Mui-disabled': { color: '#777' } }}><RemoveIcon /></IconButton></span>
                    </Tooltip>
                    <Typography variant="body2" aria-live="polite" sx={{ color: '#fff', minWidth: 54, textAlign: 'center', fontWeight: 600 }}>
                        {Math.round(zoom * 100)} %
                    </Typography>
                    <Tooltip title="Acercar">
                        <span><IconButton onClick={() => changeZoom(zoom + ZOOM_STEP)} disabled={zoom === MAX_ZOOM} aria-label="Acercar" size="small" sx={{ color: '#fff', '&.Mui-disabled': { color: '#777' } }}><AddIcon /></IconButton></span>
                    </Tooltip>
                    <Box sx={{ height: 22, borderLeft: '1px solid #555', mx: 0.5 }} />
                    <Tooltip title="Descargar imagen">
                        <IconButton
                            component="a"
                            href={`/api/organigrama/download?path=${encodeURIComponent(imagePath)}`}
                            aria-label="Descargar organigrama"
                            size="small"
                            sx={{ color: '#fff' }}
                        >
                            <DownloadIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
        </Dialog>
    );
}
