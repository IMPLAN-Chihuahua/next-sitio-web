'use client'
import React from 'react'
import { Box, Button, Grid, Typography, Link as MuiLink } from '@mui/material'
import Link from 'next/link'
import { Novedades } from '../editorial/definitions';
import { Add, Article, ChevronRight, Feed, OpenInNew } from '@mui/icons-material';

const News = ({ data }: { data: Novedades[] }) => {
    if (data.length === 0) return null;

    const featured = data[0];
    const others = data.slice(1, 4);

    const getImageUrl = (entry: any) => {
        const url = entry?.cover?.url;
        return url ? `${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${url}` : '';
    };

    return (
        <Box sx={{
            pl: { xs: 2, md: 10 },
            pr: { xs: 2, md: 10 },
            mb: 10,
        }}>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='h4' fontWeight={800}>
                    Novedades
                </Typography>
            </Box>

            <Grid container spacing={4}>
                <Grid size={{ xs: 12 }}>
                    <Link href={`/editorial/${featured.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Box
                            sx={{
                                p: { xs: 2, md: 3 },
                                backgroundColor: 'background.paper',
                                border: '1px solid',
                                borderColor: 'divider',
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                }
                            }}
                        >
                            <Grid container spacing={4}>
                                <Grid size={{ xs: 12, md: 8 }}>
                                    <Box
                                        sx={{
                                            width: '100%',
                                            height: { xs: 250, md: 400 },
                                            backgroundImage: `url(${getImageUrl(featured)})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Typography className="featured-title" variant="h5" fontWeight="bold" gutterBottom sx={{ transition: 'color 0.3s ease' }}>
                                        {featured.title}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        sx={{
                                            display: '-webkit-box',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {featured.description?.replace(/"/g, '')}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Link>
                </Grid>

                {others.map((item) => (
                    <Grid key={item.id} size={{ xs: 12, md: 4 }}>
                        <Link href={`/editorial/${item.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Box
                                sx={{
                                    p: 2,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    backgroundColor: 'background.paper',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    transition: 'all 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                    }
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: 200,
                                        backgroundImage: `url(${getImageUrl(item)})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        mb: 2
                                    }}
                                />

                                <Typography className="secondary-title" fontWeight="bold" sx={{ transition: 'color 0.3s ease' }}>
                                    {item.title}
                                </Typography>
                            </Box>
                        </Link>
                    </Grid>
                ))}
            </Grid>
            <Box sx={{
                mt: 3,
                display: 'flex',
                justifyContent: 'center'
            }}>
                <Button
                    LinkComponent={MuiLink}
                    href="/editorial"
                    variant="contained"
                    endIcon={<ChevronRight />}
                    sx={{ mt: 2, fontWeight: 600 }}
                    color='secondary'
                    size="large"
                    target='_blank'
                >
                    Ver más
                </Button>
            </Box>

        </Box>
    )
}

export default News;