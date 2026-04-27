'use client';

import { Box, Typography, Avatar } from '@mui/material';
import { SvgIconComponent } from "@mui/icons-material";

type TeamMemberProps = {
    name: string;
    role: string;
    imageUrl: string;
    icon: SvgIconComponent;
    iconColor?: string;
    email?: string;
};

const TeamMemberCard = ({
    name,
    role,
    imageUrl,
    icon: Icon,
    iconColor = '#ef5350',
    email,
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
                },
                '&:hover .member-email': {
                    opacity: 1,
                    transform: 'translateY(0)',
                },
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
                        zIndex: 2,
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

            <Box
                component="a"
                href={email ? `mailto:${email}` : undefined}
                className="member-email"
                sx={{
                    mt: 0.75,
                    fontSize: '0.7rem',
                    color: 'text.disabled',
                    textDecoration: 'none',
                    letterSpacing: '0.02em',
                    borderBottom: '0.5px solid',
                    borderColor: 'divider',
                    opacity: 0,
                    transform: 'translateY(-4px)',
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                    visibility: email ? 'visible' : 'hidden',
                    '&:hover': {
                        color: 'text.secondary',
                        borderColor: 'text.disabled',
                    },
                }}
            >
                {email}
            </Box>
        </Box>
    );
};

export default TeamMemberCard;