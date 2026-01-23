import React from 'react'
import { Box, Button, Divider, Grid, Typography } from '@mui/material'

const News = () => {
    return (
        <Box sx={{
            pl: { xs: 2, md: 10 },
            pr: { xs: 2, md: 10 },
            mb: 10
        }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant='h4' fontWeight={800} sx={{ mb: 2 }}>
                    Novedades
                </Typography>
                <Button
                    variant='outlined'
                    sx={{
                        textTransform: 'none',
                        borderRadius: 50,
                        color: 'black',
                        borderColor: 'black',
                        px: 3
                    }}
                >
                    Saber más
                </Button>
            </Box>

            <Grid container spacing={4}>

                <Grid size={{ xs: 12, md: 8 }}>
                    <Box
                        sx={{
                            width: '100%',
                            height: 300,
                            bgcolor: '#e0e0e0',
                            borderRadius: 2,
                        }}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Lorem ipsum dolor sit amet
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Typography>
                </Grid>


                {[1, 2, 3].map((item) => (
                    <Grid key={item} size={{ xs: 12, md: 4 }}>
                        <Box
                            sx={{
                                width: '100%',
                                height: 200,
                                bgcolor: '#e0e0e0', // Gris temporal
                                borderRadius: 2,
                                mb: 2
                            }}
                        />
                        <Typography fontWeight="bold">
                            Lorem ipsum dolor sit
                        </Typography>
                    </Grid>
                ))}

            </Grid>
        </Box>
    )
}

export default News