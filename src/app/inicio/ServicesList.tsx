import React from 'react'
import { Section } from '../definitions'
import { Box, Button, Grid, Stack, Typography, Container } from '@mui/material'

const ServicesList = ({ data }: { data: Section[] }) => {
    return (
        // Quitamos el Stack y manejamos el espacio individualmente
        <Box sx={{ width: '100vw', position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw' }}>
            {data.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                    <Box
                        key={index}
                        sx={{
                            bgcolor: isEven ? 'transparent' : '#f8f9fa',
                            py: { xs: 8, md: 10 },
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        <Container maxWidth="lg">
                            <Service service={item} reverse={!isEven} />
                        </Container>
                    </Box>
                )
            })}
        </Box>
    )
}

const Service = ({ service, reverse }: { service: Section, reverse: boolean }) => {
    const imageUrl = service.media.formats?.small?.url || service.media.url;

    return (
        <Grid container spacing={6} alignItems="center" sx={{
            flexDirection: { xs: 'column', md: reverse ? 'row-reverse' : 'row' },
        }}>
            <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ pr: { md: reverse ? 0 : 4 }, pl: { md: reverse ? 4 : 0 } }}>
                    <Box sx={{ width: '40px', height: '4px', bgcolor: 'primary.main', mb: 2 }} />

                    <Typography
                        variant="h4"
                        component="h2"
                        sx={{
                            fontWeight: 800,
                            color: '#1a1a1a',
                            fontSize: { xs: '2rem', md: '2.5rem' },
                            lineHeight: 1.2,
                            mb: 3
                        }}
                    >
                        {service.title}
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            lineHeight: 1.8,
                            color: 'text.secondary',
                            fontSize: { xs: 16, md: 18 },
                            textAlign: 'justify'
                        }}
                    >
                        {service.description}
                    </Typography>

                    <Box sx={{ mt: 5, display: 'flex', gap: 2 }}>
                        {service.buttons.map((btn, index) => (
                            <Button
                                key={index}
                                href={btn.url}
                                variant={index === 0 ? 'contained' : 'outlined'}
                                size="large"
                                sx={{
                                    textTransform: 'none',
                                    borderRadius: '8px',
                                    px: 4,
                                    boxShadow: index === 0 ? '0 4px 14px 0 rgba(0,118,255,0.39)' : 'none'
                                }}
                            >
                                {btn.text}
                            </Button>
                        ))}
                    </Box>
                </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{
                    height: { xs: '300px', md: '450px' },
                    width: '100%',
                    position: 'relative',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: reverse ? -20 : 20,
                        left: reverse ? 20 : -20,
                        width: '100%',
                        height: '100%',
                        border: '2px solid #e0e0e0',
                        borderRadius: 1,
                        zIndex: 0
                    }
                }}>
                    <Box sx={{
                        position: 'relative',
                        zIndex: 1,
                        height: '100%',
                        width: '100%',
                        backgroundImage: `url(${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${imageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: 1,
                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.02)'
                        }
                    }} />
                </Box>
            </Grid>
        </Grid>
    )
}


export default ServicesList