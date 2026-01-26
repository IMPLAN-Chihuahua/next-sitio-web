'use client';

import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { SvgIconComponent } from "@mui/icons-material";

type TeamMemberProps = {
    name: string;
    role: string;
    imageUrl: string;
    icon: SvgIconComponent;
    iconColor?: string;
};

const TeamMemberCard = ({
    name,
    role,
    imageUrl,
    icon: Icon,
    iconColor = '#ef5350'
}: TeamMemberProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                '&:hover .member-image': {
                    filter: 'grayscale(0%)',
                    transform: 'scale(1.05)',
                },
                '&:hover .member-icon': {
                    transform: 'scale(1.1) rotate(5deg)',
                }
            }}
        >
            <Box sx={{ position: 'relative', mb: 2 }}>

                <Avatar
                    className="member-image"
                    src={imageUrl}
                    alt={name}
                    sx={{
                        width: 200,
                        height: 200,
                        transform: 'translateZ(0)',
                        imageRendering: 'auto',
                        '& img': {
                            objectFit: 'cover',
                            objectPosition: 'top',
                        },
                        filter: 'grayscale(100%)',
                        transition: 'all 0.4s ease-in-out',
                        boxShadow: 3,
                    }}
                />

                <Box
                    className="member-icon"
                    sx={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        width: 45,
                        height: 45,
                        bgcolor: iconColor,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '3px solid white',
                        color: 'white',
                        boxShadow: 2,
                        transition: 'transform 0.3s ease',
                        zIndex: 2
                    }}
                >
                    <Icon sx={{ fontSize: 24 }} />
                </Box>
            </Box>

            <Typography variant="h6" fontWeight="bold" color="text.primary">
                {name}
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
                {role}
            </Typography>
        </Box>
    );
};

export default TeamMemberCard;