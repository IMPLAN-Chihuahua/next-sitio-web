'use client';

import React from 'react';
import { useScrollTrigger, Zoom, Fab, Box } from '@mui/material';
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
                    bottom: 24,
                    right: 24,
                    zIndex: 99,
                    '@media (max-width: 600px)': {
                        bottom: 16,
                        right: 16,
                    },
                }}
            >
                <Fab
                    onClick={handleClick}
                    color="secondary"
                    size="large"
                    aria-label="¡Llévame arriba!"
                >
                    <KeyboardArrowUpIcon />
                </Fab>
            </Box>
        </Zoom>
    );
};

export default ScrollToTop;
