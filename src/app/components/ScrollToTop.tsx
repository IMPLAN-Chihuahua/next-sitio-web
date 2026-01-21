'use client';

import React from 'react';
import { useScrollTrigger, Zoom, Fab, Box, Tooltip } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ScrollToTop = () => {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <Zoom in={trigger}>
            <Box
                role="presentation"
                sx={{
                    position: 'fixed',
                    bottom: 32,
                    right: 32,
                    zIndex: 99,
                }}
            >
                <Tooltip title="¡Llévame arriba!" placement="left">
                    <Fab
                        onClick={handleClick}
                        color="secondary"
                        size="medium"
                        aria-label="scroll back to top"
                        sx={{
                            color: 'white',
                            '&:hover': {
                                opacity: 0.8
                            }
                        }}
                    >
                        <KeyboardArrowUpIcon />
                    </Fab>
                </Tooltip>
            </Box>
        </Zoom>
    );
};

export default ScrollToTop;