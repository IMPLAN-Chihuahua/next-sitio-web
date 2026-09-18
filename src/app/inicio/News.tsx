'use client'
import React from 'react'
import { Box, Button, Grid, Typography, Link as MuiLink } from '@mui/material'
import Link from 'next/link'
import { Novedades } from '../editorial/definitions';
import { AutoStoriesOutlined, ChevronRight, SubjectOutlined } from '@mui/icons-material';



const News = ({ data }: { data: Novedades[] }) => {
    if (data.length === 0) return null;

    const featured = data[0];
    const others = data.slice(1, 4);

    const getImageUrl = (entry: any) => {
        const url = entry?.cover?.url;
        return url ? `${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${url}` : '';
    };

    return (
        <Box my={3}>
            <Typography variant='h1' component='h2' gutterBottom>
                Novedades
            </Typography>

            <Grid container spacing={2}>
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
                                <Grid size={{ xs: 12, md: 7 }}>
                                    {featured.cover ? (
                                        <Box
                                            sx={{
                                                width: '100%',
                                                height: { xs: 250, md: 400 },
                                                backgroundImage: `url(${getImageUrl(featured)})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                            }}
                                        />
                                    ) : (
                                        <Box
                                            sx={{
                                                width: '100%',
                                                height: { xs: 250, md: 400 },
                                                bgcolor: 'primary.300',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <AutoStoriesOutlined
                                                sx={{
                                                    fontSize: 80,
                                                    color: 'primary.600',
                                                }}
                                            />
                                        </Box>
                                    )}
                                </Grid>

                                <Grid size={{ xs: 12, md: 5 }} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                                    <Typography variant="h2" component='h3' gutterBottom >
                                        {featured.title}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        sx={{
                                            lineHeight: '1.5rem',
                                            textDecoration: 'none',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 5,
                                            WebkitBoxOrient: 'vertical',
                                            wordBreak: 'break-word',
                                            overflow: 'hidden'
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
                                {item.cover ? (
                                    <Box
                                        sx={{
                                            width: '100%',
                                            height: 200,
                                            backgroundImage: `url(${getImageUrl(item)})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            mb: 2,
                                        }}
                                    />
                                ) : (
                                    <Box
                                        sx={{
                                            width: '100%',
                                            height: 200,
                                            bgcolor: 'primary.300',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            mb: 2,
                                        }}
                                    >
                                        <SubjectOutlined
                                            sx={{
                                                fontSize: 64,
                                                color: 'primary.600',
                                            }}
                                        />
                                    </Box>
                                )}

                                <Typography variant='h4' component='h3'>
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
                    LinkComponent={Link}
                    href="/editorial"
                    variant="outlined"
                    endIcon={<ChevronRight />}
                    sx={{ mt: 2, fontWeight: 600, borderRadius: '50px' }}
                    size="large"
                >
                    Ver más
                </Button>
            </Box>

        </Box>
    )
}

export default News;