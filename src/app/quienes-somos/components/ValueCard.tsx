'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { SvgIconComponent } from "@mui/icons-material";

export type ValueCardProps = {
    title: string;
    description: string;
    icon: SvgIconComponent;
    iconBgColor?: string;
};

const ValueCard = ({
    title,
    description,
    icon: Icon,
    iconBgColor = 'primary.main'
}: ValueCardProps) => {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                textAlign: 'center',
                height: '100%',
                bgcolor: 'transparent',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    mb: 2,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 60,
                    height: 60,
                    borderRadius: 2,
                    bgcolor: iconBgColor,
                    color: 'common.white',
                    boxShadow: 1,
                }}
            >
                <Icon sx={{ fontSize: 30 }} />
            </Box>
            <Typography
                variant="subtitle1"
                component="h3"
                sx={{
                    fontWeight: 'bold',
                    mb: 1,
                    textTransform: 'uppercase',
                    color: 'text.primary',
                    letterSpacing: 0.5
                }}
            >
                {title}
            </Typography>
            <Typography
                variant="body2"
                sx={{
                    color: 'text.secondary',
                    fontSize: '0.85rem',
                    lineHeight: 1.5,
                    maxWidth: '220px'
                }}
            >
                {description}
            </Typography>
        </Paper>
    );
};

export default ValueCard;