'use client'
import { Box, Container, Typography, Chip, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Novedad } from '../definitions';
import Link from 'next/link';
import { Image as ImageIcon } from '@mui/icons-material';
import { parse } from 'date-fns';

const dateFormatOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };

export default function Destacados({ data }: { data: Novedad[] }) {
    if (!data || data.length === 0) return null;

    const destacados = data.slice(0, 3);

    const mainPost = destacados[0];
    const secondaryPosts = destacados.slice(1);

    return (
        <Container >

            <Grid container spacing={3}>

                <Grid size={{ xs: 12, md: 8 }}>
                    <FeaturedCard item={mainPost} isLarge={true} />
                </Grid>

                {secondaryPosts.length > 0 && (
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Stack spacing={3} sx={{ height: '100%' }}>
                            {secondaryPosts.map((post) => (
                                <FeaturedCard key={post.id} item={post} isLarge={false} />
                            ))}
                        </Stack>
                    </Grid>
                )}

            </Grid>
        </Container>
    );
}

const FeaturedCard = ({ item, isLarge }: { item: Novedad, isLarge: boolean }) => {

    const imageUrl = item?.cover?.url ? `${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${item.cover.url}` : '';
    const autor = item?.autor?.[0] ? `${item.autor[0].nombres} ${item.autor[0].apellidos}` : 'IMPLAN';
    const fecha = item?.fechaPublicacion ? parse(item.fechaPublicacion, 'yyyy-MM-dd', new Date()).toLocaleDateString('es-MX', dateFormatOptions) : '';

    return (
        <Box
            component={Link}
            href={`/editorial/${item.slug}`}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                borderRadius: 1,
                overflow: 'hidden',
                textDecoration: 'none',
                minHeight: isLarge ? { xs: 400, md: 500 } : { xs: 300, md: 'auto' },
                flex: isLarge ? 'none' : 1,

                backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
                backgroundColor: 'grey.300',
                backgroundSize: 'cover',
                backgroundPosition: 'center',

                '&::after': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.95) 100%)',
                    zIndex: 1,
                    transition: 'background 0.3s ease',
                },
                '&:hover::after': {
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,1) 100%)',
                },
                '& .card-content': { transition: 'transform 0.3s ease' },
                '&:hover .card-content': { transform: 'translateY(-4px)' }
            }}
        >
            {!imageUrl && (
                <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 0 }}>
                    <ImageIcon sx={{ fontSize: 64, color: 'grey.500' }} />
                </Box>
            )}

            <Box
                className="card-content"
                sx={{
                    position: 'relative',
                    zIndex: 2,
                    p: isLarge ? { xs: 3, md: 5 } : 3,
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}
            >
                <Typography
                    variant="caption"
                    sx={{
                        color: 'rgba(255,255,255,0.9)',
                        fontWeight: 500,
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}
                >
                    Por: {autor} | {fecha}
                </Typography>

                <Box>
                    <Chip
                        label="Destacado"
                        size="small"
                        sx={{
                            bgcolor: '#e7a243',
                            color: '#111827',
                            fontWeight: 700,
                            mb: 1.5
                        }}
                    />
                    <Typography
                        variant={isLarge ? "h4" : "h6"}
                        component="h3"
                        fontWeight={700}
                        sx={{
                            color: '#ffffff',
                            mb: 1,
                            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                            lineHeight: 1.2,
                            display: '-webkit-box',
                            WebkitLineClamp: isLarge ? 4 : 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                        }}
                    >
                        {item.title}
                    </Typography>

                    {isLarge && item.description && (
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'rgba(255,255,255,0.85)',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}
                        >
                            {item.description}
                        </Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
}