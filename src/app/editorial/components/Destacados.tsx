import { Box, Card, CardMedia, Container, Grid, Typography, CardContent, Chip } from '@mui/material'
import React from 'react'
import { Novedades } from '../definitions';
import Link from 'next/link';

const mockFeatured = [
    { id: 1, title: "El reto de la movilidad en el centro histórico", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80", category: "Movilidad" },
    { id: 2, title: "Neurourbanismo y salud mental en la ciudad", image: "https://images.unsplash.com/photo-1541888069695-9266014ba512?auto=format&fit=crop&w=800&q=80", category: "Salud Urbana" },
];

const Destacados = ({ data }: { data: Novedades[] }) => {
    // Si no hay posts destacados, no renderizamos esta sección para que no quede un hueco en blanco
    if (!data || data.length === 0) return null;

    // Helper para sacar la URL completa de la imagen
    const getImageUrl = (entry: Novedades) => {
        const url = entry?.media?.[0]?.url;
        return url ? `${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${url}` : '';
    };

    return (
        <Container maxWidth='lg'>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" fontWeight={700}>Artículos Destacados</Typography>
            </Box>
            <Grid container spacing={4} sx={{ mb: 8 }}>
                {data.map((item) => (
                    <Grid size={{ xs: 12, md: 6 }} key={item.id}>

                        <Link href={`/editorial/${item.slug}`} style={{ textDecoration: 'none' }}>
                            <Card sx={{
                                borderRadius: 4,
                                boxShadow: 3,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'transform 0.2s',
                                '&:hover': { transform: 'translateY(-4px)' }
                            }}>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={getImageUrl(item)}
                                    alt={item.title}
                                    sx={{ bgcolor: 'grey.300' }}
                                />
                                <CardContent sx={{ p: 4, flexGrow: 1 }}>
                                    <Chip label="Destacado" size="small" sx={{ mb: 2, bgcolor: 'primary.main', color: 'white' }} />

                                    <Typography variant="h4" fontWeight={700} sx={{ color: 'text.primary' }}>
                                        {item.title}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default Destacados