'use client';

import { Box, Grid, List, Typography, ListItemButton, ListItemText, Fade, Paper, Button } from '@mui/material'
import React, { useState } from 'react'
import { Platform } from '../definitions'

const ProjectsExplorer = ({ data }: { data: Platform[] }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    if (!data || data.length === 0) return null;

    const activePlatform = data[selectedIndex]
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container sx={{
                display: 'flex',
                mt: 10,
                justifyContent: 'space-around',
                alignItems: 'flex-start'
            }}>
                <Grid sx={{ mr: 5 }} size={{ xs: 12, md: 4 }}>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant='h2' fontWeight={'bold'}
                            sx={{
                                lineHeight: 1,
                                marginTop: '-6px'
                            }}
                        >Plataformas</Typography>
                        <Typography variant='h5' color='textSecondary'>Conoce nuestras plataformas y soluciones tecnológicas</Typography>
                    </Box>
                    <List component={'nav'}>
                        {
                            data.map((item: Platform, index: number) => {
                                const isActive = index === selectedIndex;
                                return (
                                    <ListItemButton
                                        key={index}
                                        disableRipple
                                        sx={{
                                            alignItems: 'flex-start',
                                            '&:hover': { bgcolor: 'transparent', opacity: 0.7 },
                                            width: 'fit-content'
                                        }}
                                    >
                                        <ListItemText
                                            primary={
                                                <Box sx={{
                                                    display: 'flex',
                                                    alignItems: 'flex-start'
                                                }}>
                                                    <Typography
                                                        variant="h5"
                                                        component="span"
                                                        onClick={() => setSelectedIndex(index)}
                                                        fontWeight={isActive ? 'bold' : 'normal'}
                                                        color={isActive ? 'text.primary' : 'text.disabled'}
                                                        sx={{
                                                            position: 'relative',
                                                            display: 'inline-block',
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
                                                            sx={{ ml: 0.5, mt: 1 }}
                                                        >
                                                            {String(index + 1).padStart(2, '0')}
                                                        </Typography>
                                                    )}
                                                </Box>
                                            }
                                        >
                                        </ListItemText>
                                    </ListItemButton>
                                )
                            })
                        }
                    </List>
                </Grid>

                <Grid size={{
                    xs: 12, md: 6
                }}>
                    <Project key={selectedIndex} data={activePlatform} />
                </Grid>
            </Grid>
        </Box>
    )
}

const Project = ({ data }: { data: Platform }) => {
    return (
        <Fade in={true} timeout={0} unmountOnExit>
            <Box sx={{
                position: 'relative',
                height: '600px',
                maxWidth: '600px',
                aspectRatio: '1 / 1',
                backgroundImage: `url(${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${data.media.formats?.small?.url || data.media.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                overflow: 'hidden',
            }}>
                <Paper
                    elevation={0}
                    sx={{
                        position: 'absolute',
                        top: 30,
                        right: 0,
                        maxWidth: 350,
                        p: 1,
                        bgcolor: 'white',
                        zIndex: 2,
                        borderRadius: 0
                    }}
                >
                    <Typography variant='h4' fontWeight={'bold'}>
                        {data.name}
                    </Typography>
                    <Typography variant='body1'>
                        {data.catchPhrase}
                    </Typography>
                </Paper>
                <Paper
                    elevation={0}
                    sx={{
                        position: 'absolute',
                        top: 180,
                        right: 0,
                        width: 300,
                        p: 1,
                        bgcolor: '#2c2f33',
                        color: 'white',
                        zIndex: 2,
                        borderRadius: 0,
                        mt: 2

                    }}
                >
                    <Typography variant="h6" fontSize={18} color='white'>{data.description}</Typography>
                </Paper>

                <Paper
                    elevation={3}
                    sx={{
                        position: 'absolute',
                        bottom: 30,
                        left: 40,
                        zIndex: 2,
                    }}>
                    <Button sx={{ borderRadius: 0 }} variant='contained'
                        href={data.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        ver mas
                    </Button>
                </Paper>
            </Box>
        </Fade>
    )
}

export default ProjectsExplorer