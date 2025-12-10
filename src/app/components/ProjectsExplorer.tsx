'use client';

import { Box, Grid, List, Typography, ListItemButton, ListItemText, Fade, Paper, Button } from '@mui/material'
import React, { useState } from 'react'
import { Platform } from '../definitions'

const ProjectsExplorer = ({ data }: { data: Platform[] }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    if (!data || data.length === 0) return null;

    const activePlatform = data[selectedIndex]
    return (
        <Box sx={{ width: '100%', p: 4 }}>
            <Box sx={{ mb: 2 }}>
                <Typography variant='h3' fontWeight={'bold'}>Plataformas</Typography>
                <Typography variant='h5' color='textSecondary'>Conoce nuestras plataformas y soluciones tecnológicas</Typography>
            </Box>
            <Grid container sx={{
                display: 'flex',
                justifyContent: 'space-around',
            }}>
                <Grid sx={{ mr: 5 }} size={{ xs: 12, md: 6 }}>
                    <List component={'nav'}>
                        {
                            data.map((item: Platform, index: number) => {
                                const isActive = index === selectedIndex;
                                return (
                                    <ListItemButton
                                        key={index}
                                        onClick={() => setSelectedIndex(index)}
                                        disableRipple
                                        sx={{
                                            borderBottom: isActive ? '3px solid #000' : 'none',
                                            alignItems: 'flex-start',
                                            '&:hover': { bgcolor: 'transparent', opacity: 0.7 }
                                        }}
                                    >
                                        <ListItemText
                                            primary={
                                                <Box sx={{
                                                    display: 'flex',
                                                    alignItems: 'flex-start'
                                                }}>
                                                    <Typography variant='h5' component={'span'} fontWeight={isActive ? 'bold' : 'normal'}
                                                        color={isActive ? 'text.primary' : 'text.disabled'}>
                                                        {item.name}
                                                    </Typography>
                                                    {isActive && (
                                                        <Typography
                                                            component="span"
                                                            variant="caption"
                                                            fontWeight="bold"
                                                            sx={{ ml: 1, mt: 1 }}
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
                    xs: 12, md: 4
                }}>
                    <Project key={selectedIndex} data={activePlatform} />
                </Grid>
            </Grid>
        </Box>
    )
}

const Project = ({ data }: { data: Platform }) => {
    return (
        <Fade in={true} timeout={500}>
            <Box sx={{
                position: 'relative',
                height: '500px',
                width: '500px',
                backgroundImage: `url(http://localhost:1337${data.media.formats?.small.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                overflow: 'hidden',
            }}>
                <Paper
                    elevation={0}
                    sx={{
                        position: 'absolute',
                        top: 30,
                        right: 20,
                        width: 300,
                        p: 1,
                        bgcolor: 'white',
                        zIndex: 2
                    }}

                >
                    <Typography variant='h5' fontWeight={'bold'}>
                        {data.name}
                    </Typography>
                    <Typography variant='body2'>
                        {data.catchPhrase}
                    </Typography>
                </Paper>
                <Paper
                    elevation={0}
                    sx={{
                        position: 'absolute',
                        top: 200,
                        right: 20,
                        width: 300,
                        p: 1,
                        bgcolor: '#2c2f33',
                        color: 'white',
                        zIndex: 2
                    }}
                >
                    <Typography variant="caption" color='white'>{data.description}</Typography>
                </Paper>

                <Paper
                    elevation={3}
                    sx={{
                        position: 'absolute',
                        bottom: 40,
                        left: 40,
                        zIndex: 2
                    }}>
                    <Button variant='contained'>
                        ver mas
                    </Button>
                </Paper>
            </Box>
        </Fade>
    )
}

export default ProjectsExplorer