'use client'
import React from 'react';
import {
    Box,
    Typography,
    Button,
    Chip,
    Stack,
    Divider,
    useTheme,
    useMediaQuery,
    Grid
} from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import PublicIcon from '@mui/icons-material/Public';
import SchoolIcon from '@mui/icons-material/School';

export interface JobOpeningProps {
    title: string;
    description: string;
    applyUrl: string;
    badges: {
        label: string;
        iconType?: 'time' | 'location' | 'type';
    }[];
}

const JobListingItem: React.FC<JobOpeningProps> = ({ title, description, applyUrl, badges }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const getIcon = (type?: string) => {
        switch (type) {
            case 'time': return <WorkOutlineIcon fontSize="small" />;
            case 'location': return <PublicIcon fontSize="small" />;
            case 'type': return <SchoolIcon fontSize="small" />;
            default: return undefined;
        }
    };

    return (
        <>
            <Box sx={{ py: 4, bgcolor: '#ffffff', px: { xs: 2, md: 4 } }}>
                <Grid container spacing={2} alignItems={isMobile ? "flex-start" : "center"}>
                    <Grid size={{ xs: 12, md: 9 }}>
                        <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom sx={{ color: '#111827' }}>
                            {title}
                        </Typography>

                        <Typography variant="body1" sx={{ color: 'text.primary', mb: 2, maxWidth: '90%' }}>
                            {description}
                        </Typography>

                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 2 }}>
                            {badges.map((badge, index) => (
                                <Chip
                                    key={index}
                                    label={badge.label}
                                    icon={getIcon(badge.iconType)}
                                    variant="outlined"
                                    sx={{
                                        fontWeight: 600,
                                        borderRadius: '8px',
                                        borderColor: 'grey.300',
                                        color: '#111827',
                                        '& .MuiChip-icon': {
                                            color: '#4b5563'
                                        }
                                    }}
                                />
                            ))}
                        </Stack>
                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }} display="flex" justifyContent={isMobile ? "flex-start" : "flex-end"}>
                        <Button
                            variant="text"
                            endIcon={<ArrowOutwardIcon />}
                            href={applyUrl}
                            target="_blank"
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                textTransform: 'none',
                                mt: isMobile ? 2 : 0,
                                color: '#231703',
                                '&:hover': {
                                    bgcolor: 'rgba(231, 162, 67, 0.1)',
                                }
                            }}
                        >
                            Aplicar
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Divider sx={{ borderBottomWidth: 1, borderColor: 'grey.200' }} />
        </>
    );
};

export default JobListingItem;