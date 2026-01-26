import React from 'react'
import { SvgIconComponent } from "@mui/icons-material";
import { Box, Typography, Paper } from '@mui/material';
import { alpha } from '@mui/material/styles';

type CardInfoType = {
    title: string;
    text: string;
    icon?: SvgIconComponent;
}

const CardInfo = ({ title, text, icon: Icon }: CardInfoType) => {
    return (
        <Paper
            elevation={0}
            sx={{
                height: '100%',
                borderRadius: 4,
                border: '1px solid',
                borderColor: 'divider',
                p: 4,
                bgcolor: 'background.paper',
                transition: 'all 0.3s ease',

                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',

                '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-4px)',
                    borderColor: 'primary.light',
                }
            }}
        >
            {Icon && (
                <Box
                    sx={{
                        mb: 3,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        color: 'primary.main',
                    }}
                >
                    <Icon sx={{ fontSize: 28 }} />
                </Box>
            )}

            <Typography
                variant="h6"
                component="h3"
                sx={{
                    fontWeight: 'bold',
                    mb: 1.5,
                    color: 'text.primary'
                }}
            >
                {title}
            </Typography>

            <Typography
                variant="body1"
                sx={{
                    color: 'text.secondary',
                    lineHeight: 1.6
                }}
            >
                {text}
            </Typography>
        </Paper>
    );
};

export default CardInfo