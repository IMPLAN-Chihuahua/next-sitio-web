'use client';

import { Box, Grid, List, Typography, ListItemButton, ListItemText, Paper, Button, Container, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import React, { useState } from 'react'
import { Platform } from '../definitions'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { Overlay } from '../components/LandingPageBanner';
import { Launch } from '@mui/icons-material';

const ProjectsExplorer = ({ data }: { data: Platform[] }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    if (!data || data.length === 0) return null;

    const activePlatform = data[selectedIndex]

    return (
        <Grid
            container
            sx={{ py: 3 }}
            columnSpacing={2}
        >
            <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ mb: 2 }}>
                    <Typography variant='h1' component={'h2'} gutterBottom>
                        Plataformas
                    </Typography>

                    <Typography fontSize={'1.2rem'}>
                        Conoce nuestras plataformas y soluciones tecnológicas
                    </Typography>
                </Box>

                <Box sx={{ position: 'relative', width: '100%' }}>
                    <List component={'nav'}
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'row', md: 'column' },
                            overflowX: { xs: 'auto', md: 'visible' },
                            width: '100%',
                            maxWidth: '100vw',
                            gap: { xs: 2, md: 0 },
                            pb: 2,
                            scrollSnapType: { xs: 'x mandatory', md: 'none' },

                            '&::-webkit-scrollbar': {
                                height: '3px',
                                display: { xs: 'block', md: 'none' }
                            },
                            '&::-webkit-scrollbar-track': {
                                backgroundColor: '#e0e0e0',
                                borderRadius: '4px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: '#000000',
                                borderRadius: '4px',
                            }
                        }}>
                        {data.map((item: Platform, index: number) => {
                            const isActive = index === selectedIndex;
                            return (
                                <ListItemButton
                                    key={index}
                                    disableRipple
                                    onClick={() => setSelectedIndex(index)}
                                    sx={{
                                        whiteSpace: 'nowrap',
                                        flexShrink: 0,
                                        alignItems: 'center',
                                        justifyContent: { xs: 'center', md: 'flex-start' },
                                        mr: { xs: 0, md: 0 },
                                        pl: { xs: 2, md: 2 },
                                        pr: { xs: 2, md: 0 },
                                        mb: { xs: 0, md: 1 },

                                        color: isActive
                                            ? { xs: 'white', md: 'primary.main' }
                                            : 'text.secondary',

                                        transition: 'all 0.3s ease',
                                        scrollSnapAlign: 'start',
                                    }}
                                >
                                    <ListItemText
                                        primary={
                                            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                                <Typography
                                                    variant="h5"
                                                    component="span"
                                                    fontWeight={isActive ? 'bold' : 'normal'}
                                                    color={isActive ? 'text.primary' : 'text.secondary'}
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
                xs: 12, md: 8
            }}>
                <Project key={selectedIndex} data={activePlatform} />
            </Grid>
        </Grid>
    )
}

const Project = ({ data }: { data: Platform }) => {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const bgImage = `${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${data.media.formats?.large?.url || data.media.url}`;

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
                key={data.name}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{ width: '100%', height: '100%' }}
            >
                <Box sx={{
                    position: 'relative',
                    height: { xs: 'auto', md: '600px' },
                    maxWidth: 'none',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
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
                            mb: { xs: 2, md: 0 },
                            boxShadow: { md: '0 20px 40px rgba(0,0,0,0.08)' }
                        }} />
                    </motion.div>

                    <Box component={motion.div} variants={itemVariants} sx={{
                        position: { xs: 'relative', md: 'absolute' },
                        top: { md: 34 },
                        right: { md: 28 },
                        width: { xs: '100%', md: 380 },
                        zIndex: 2,
                        mt: { xs: 0, md: 0 },
                        mb: { xs: 2, md: 0 }
                    }}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: { xs: 3, md: 4 },
                                bgcolor: 'primary.900',
                                color: 'white',
                                borderRadius: 1,
                                position: 'relative',
                                backdropFilter: 'blur(12px)',
                                borderTop: '4px solid rgba(255, 255, 255, 0.42)',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: -4,
                                    left: 0,
                                    width: '72px',
                                    height: '4px',
                                    // bgcolor: '#1a1a1a',
                                    display: { xs: 'none', md: 'block' }
                                }
                            }}
                        >
                            <Typography
                                variant='h3'
                                component='h3'
                                fontWeight={800}
                                color='white'
                            >
                                {data.name}
                            </Typography>
                            <Typography variant='body1' sx={{ mt: 1, color: 'primary.50', fontWeight: 500 }}>
                                {data.catchPhrase}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    mt: 3,
                                    lineHeight: 1.55,
                                    color: 'primary.100',
                                    textDecoration: 'none',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 4,
                                    WebkitBoxOrient: 'vertical',
                                    wordBreak: 'break-word',
                                    overflow: 'hidden'
                                }}>
                                {data.description}
                            </Typography>
                            <Button
                                onClick={() => setIsDetailsOpen(true)}
                                sx={{
                                    mt: 2,
                                    px: 0,
                                    minWidth: 'auto',
                                    color: 'white',
                                    fontWeight: 800,
                                    textTransform: 'none',
                                    '&:hover': { bgcolor: 'transparent', opacity: 0.72 }
                                }}
                            >
                                Leer más
                            </Button>
                        </Paper>
                    </Box>

                    <Box component={motion.div} variants={itemVariants} sx={{
                        position: { xs: 'relative', md: 'absolute' },
                        bottom: { md: 40 },
                        left: { md: 40 },
                        zIndex: 2,
                        alignSelf: { xs: 'flex-start', md: 'auto' }
                    }}>
                        <Button
                            size='large'
                            variant='contained'
                            disableElevation
                            color='primary'
                            disableRipple
                            sx={{ 
                                fontWeight: 600, 
                                textTransform: 'none', 
                                borderRadius: '50px',
                                bgcolor: 'primary.900',
                                ':hover': {
                                    bgcolor: 'primary.800'
                                }
                             }}
                            href={data.url}
                            target="_blank"
                            endIcon={<Launch />}
                            rel="noopener noreferrer"
                        >
                            Explorar
                        </Button>
                    </Box>

                </Box>
                <Dialog
                    open={isDetailsOpen}
                    onClose={() => setIsDetailsOpen(false)}
                    maxWidth="sm"
                    fullWidth
                    PaperProps={{
                        sx: {
                            borderRadius: 1,
                            p: { xs: 1, md: 2 }
                        }
                    }}
                >
                    <DialogTitle component="div" sx={{ pr: 6 }}>
                        <Typography variant="h5" component="h3">
                            {data.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            {data.catchPhrase}
                        </Typography>
                        <IconButton
                            aria-label="Cerrar"
                            onClick={() => setIsDetailsOpen(false)}
                            sx={{ position: 'absolute', right: 16, top: 16 }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <Typography variant="body1" sx={{ lineHeight: 1.7 }} gutterBottom>
                            {data.description}
                        </Typography>
                        <Button
                            variant="text"
                            sx={{
                                color: 'primary.800',
                                textTransform: 'none'
                            }}
                            endIcon={<Launch />}
                            href={data.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Explorar
                        </Button>
                    </DialogContent>
                </Dialog>
            </motion.div>
        </AnimatePresence>
    )
}
export default ProjectsExplorer
