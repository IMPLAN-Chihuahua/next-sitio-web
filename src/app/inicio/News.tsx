'use client'
import React from 'react'
import { Box, Button, Grid, Typography } from '@mui/material'
import Link from 'next/link'
import { Novedades } from '../editorial/definitions';

const News = ({ data }: { data: Novedades[] }) => {
    if (data.length === 0) return null;

    const featured = data[0];
    const others = data.slice(1, 4);

    const getImageUrl = (entry: any) => {
        const url = entry?.media?.[0]?.url;
        return url ? `${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${url}` : '';
    };

    return (
        <Box sx={{
            pl: { xs: 2, md: 10 },
            pr: { xs: 2, md: 10 },
            mb: 10
        }}>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='h4' fontWeight={800}>
                    Novedades
                </Typography>
                <Button
                    component={Link}
                    href="/editorial"
                    variant='outlined'
                    sx={{
                        textTransform: 'none',
                        borderRadius: 50,
                        color: 'black',
                        borderColor: 'black',
                        px: 3,
                        '&:hover': { borderColor: 'grey.700', bgcolor: 'grey.50' }
                    }}
                >
                    Saber más
                </Button>
            </Box>

            <Grid container spacing={4}>
                {/* --- ARTÍCULO DESTACADO (GRANDE) --- */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <Link href={`/editorial/${featured.slug}`} style={{ textDecoration: 'none' }}>
                        <Box
                            sx={{
                                width: '100%',
                                height: 400,
                                backgroundImage: `url(${getImageUrl(featured)})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: 2,
                                transition: 'transform 0.3s ease',
                                '&:hover': { transform: 'scale(1.01)' }
                            }}
                        />
                    </Link>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Link href={`/editorial/${featured.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ '&:hover': { color: 'primary.main' } }}>
                            {featured.title}
                        </Typography>
                    </Link>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Quitamos las comillas y escape characters si vienen del JSON */}
                        {featured.description?.replace(/"/g, '')}
                    </Typography>
                </Grid>

                {/* --- ARTÍCULOS SECUNDARIOS (3 ABAJO) --- */}
                {others.map((item) => (
                    <Grid key={item.id} size={{ xs: 12, md: 4 }} >
                        <Link href={`/editorial/${item.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Box
                                sx={{
                                    width: '100%',
                                    height: 200,
                                    backgroundImage: `url(${getImageUrl(item)})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    borderRadius: 2,
                                    mb: 2,
                                    transition: 'transform 0.3s ease',
                                    '&:hover': { transform: 'scale(1.02)' }
                                }}
                            />
                            <Typography fontWeight="bold" sx={{ '&:hover': { color: 'primary.main' } }}>
                                {item.title}
                            </Typography>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default News;