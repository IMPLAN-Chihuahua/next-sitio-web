'use client';

import { Box, Grid, List, Typography, ListItemButton, ListItemText, Fade, Paper, Button } from '@mui/material'
import React, { useState } from 'react'
import { Platform } from '../definitions'
import { motion, AnimatePresence, Variants } from 'framer-motion'

const ProjectsExplorer = ({ data }: { data: Platform[] }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    if (!data || data.length === 0) return null;

    const activePlatform = data[selectedIndex]



    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{

            }}
            >
                <Grid container sx={{
                    display: 'flex',
                    mt: { xs: 4, md: 10 },
                    justifyContent: 'space-around',
                    alignItems: 'flex-start',
                }}>
                    <Grid size={{ xs: 12, md: 4 }} sx={{ mr: { md: 5 }, mb: { xs: 4, md: 0 } }}>
                        <Box sx={{ mb: 2, px: { xs: 2, md: 0 } }}>
                            <Typography variant='h2' fontWeight={'bold'}
                                sx={{
                                    lineHeight: 1,
                                    marginTop: '-6px',
                                    fontSize: { xs: '2.5rem', md: '3.75rem' }
                                }}
                            >
                                Plataformas
                            </Typography>
                            <Typography variant='h5' color='textSecondary' sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
                                Conoce nuestras plataformas y soluciones tecnológicas
                            </Typography>
                        </Box>

                        <Box sx={{ position: 'relative', width: '100%', mb: 2 }}>
                            <List component={'nav'}
                                sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'row', md: 'column' }, overflowX: { xs: 'auto', md: 'visible' },
                                    width: '100%',
                                    pb: 1,
                                    scrollSnapType: { xs: 'x mandatory', md: 'none' },
                                    '&::-webkit-scrollbar': { display: 'none' },
                                    scrollbarWidth: 'none',
                                }}>
                                {data.map((item: Platform, index: number) => {
                                    const isActive = index === selectedIndex;
                                    return (
                                        <ListItemButton
                                            key={index}
                                            disableRipple
                                            onClick={() => setSelectedIndex(index)}
                                            sx={{
                                                mb: 1,
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    transform: 'translateX(5px)' // Pequeño efecto de empuje
                                                },
                                            }}
                                        >
                                            <ListItemText
                                                primary={
                                                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                                        <Typography
                                                            variant="h5"
                                                            component="span"
                                                            fontWeight={isActive ? 'bold' : 'normal'}
                                                            color={isActive ? 'text.primary' : 'text.disabled'}
                                                            sx={{
                                                                position: 'relative',
                                                                display: 'inline-block',
                                                                whiteSpace: 'nowrap',
                                                                '&::after': {
                                                                    content: '""',
                                                                    position: 'absolute',
                                                                    left: 0,
                                                                    bottom: -1,
                                                                    height: '2px',
                                                                    width: isActive ? '100%' : '0%',
                                                                    backgroundColor: '#000',
                                                                    transition: 'width 0.3s ease-in-out',
                                                                },
                                                            }}
                                                        >
                                                            {item.name}
                                                        </Typography>
                                                        {isActive && (
                                                            <Typography
                                                                component="span"
                                                                variant="caption"
                                                                fontWeight="bold"
                                                                sx={{ ml: 0.5, mt: 1, display: { xs: 'none', md: 'inline' } }}
                                                            >
                                                                {String(index + 1).padStart(2, '0')}
                                                            </Typography>
                                                        )}
                                                    </Box>
                                                }
                                            />
                                        </ListItemButton>
                                    )
                                })}
                            </List>
                        </Box>
                    </Grid>

                    <Grid size={{
                        xs: 12, md: 6
                    }}>
                        <Project key={selectedIndex} data={activePlatform} />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

const Project = ({ data }: { data: Platform }) => {
    // URL de la imagen helper
    const bgImage = `${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${data.media.formats?.small?.url || data.media.url}`;
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 } // Efecto cascada
        },
        exit: { opacity: 0, transition: { duration: 0.2 } }
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 50 }
        }
    };
    return (
        <AnimatePresence mode='wait'>
            <motion.div
                key={data.name} // IMPORTANTE: La key dispara la animación al cambiar de plataforma
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{ width: '100%', height: '100%' }}
            >
                <Box sx={{
                    position: 'relative',
                    // Mantenemos tu altura fija en desktop, auto en mobile
                    height: { xs: 'auto', md: '600px' },
                    maxWidth: '800px', // Aumenté un poco el max-width para que respire más en desktop
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}>

                    {/* IMAGEN DE FONDO */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, scale: 0.98 },
                            visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
                        }}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <Box sx={{
                            position: { xs: 'relative', md: 'absolute' },
                            inset: 0,
                            height: { xs: '300px', md: '100%' },
                            backgroundImage: `url(${bgImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            zIndex: 0,
                            borderRadius: { xs: 2, md: 4 }, // Bordes más suaves en desktop
                            mb: { xs: 2, md: 0 },
                            // Sombra suave para separar del fondo blanco de la página
                            boxShadow: { md: '0 20px 40px rgba(0,0,0,0.08)' }
                        }} />
                    </motion.div>

                    {/* CARD SUPERIOR (Título) */}
                    <Box component={motion.div} variants={itemVariants} sx={{
                        position: { xs: 'relative', md: 'absolute' },
                        top: { md: 40 },
                        right: { md: -20 }, // Efecto "salido" del margen
                        maxWidth: { xs: '100%', md: 400 },
                        width: { xs: '100%', md: 'auto' },
                        zIndex: 2,
                        mb: { xs: 1, md: 0 }
                    }}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: 0, // Mantenemos tu estilo cuadrado
                                // GLASSMORPHISM: Fondo blanco semitransparente con blur
                                bgcolor: { xs: 'white', md: 'rgba(255, 255, 255, 0.9)' },
                                backdropFilter: { md: 'blur(12px)' },
                                borderLeft: '6px solid #1a1a1a', // Acento visual fuerte
                                boxShadow: { md: '0 8px 32px rgba(0, 0, 0, 0.1)' }
                            }}
                        >
                            <Typography variant='h4' fontWeight={'800'} sx={{ fontSize: { xs: '1.5rem', md: '2.5rem' }, letterSpacing: '-0.5px' }}>
                                {data.name}
                            </Typography>
                            <Typography variant='body1' sx={{ mt: 1, color: 'text.secondary', fontWeight: 500 }}>
                                {data.catchPhrase}
                            </Typography>
                        </Paper>
                    </Box>

                    {/* CARD INFERIOR (Descripción) */}
                    <Box component={motion.div} variants={itemVariants} sx={{
                        position: { xs: 'relative', md: 'absolute' },
                        bottom: { md: 80 }, // Lo moví al bottom para equilibrar
                        right: { md: 0 },
                        width: { xs: '100%', md: 320 },
                        zIndex: 2,
                        mt: { xs: 0, md: 2 },
                        mb: { xs: 2, md: 0 }
                    }}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                bgcolor: '#2c2f33',
                                color: 'white',
                                borderRadius: 0,
                                position: 'relative',
                                '&::before': { // Detalle decorativo
                                    content: '""',
                                    position: 'absolute',
                                    top: -10,
                                    left: -10,
                                    width: '40px',
                                    height: '40px',
                                    borderTop: '4px solid #2c2f33',
                                    borderLeft: '4px solid #2c2f33',
                                    display: { xs: 'none', md: 'block' }
                                }
                            }}
                        >
                            <Typography variant="body2" fontSize={16} sx={{ lineHeight: 1.6, opacity: 0.9 }}>
                                {data.description}
                            </Typography>
                        </Paper>
                    </Box>

                    {/* BOTÓN (CTA) */}
                    <Box component={motion.div} variants={itemVariants} sx={{
                        position: { xs: 'relative', md: 'absolute' },
                        bottom: { md: 40 },
                        left: { md: 40 },
                        zIndex: 2,
                        alignSelf: { xs: 'flex-start', md: 'auto' }
                    }}>
                        <Button
                            sx={{
                                borderRadius: 0,
                                px: 5,
                                py: 1.5,
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                boxShadow: 3,
                                transition: 'transform 0.2s',
                                '&:hover': { transform: 'scale(1.05)' }
                            }}
                            variant='contained'
                            href={data.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Explorar
                        </Button>
                    </Box>

                </Box>
            </motion.div>
        </AnimatePresence>
    )
}
export default ProjectsExplorer