'use client'

import React, { useState, ChangeEvent } from 'react';
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Stack,
    Pagination,
    Grid,
    Chip,
    Typography,
    Alert
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Link from 'next/link';
import useSWR from 'swr';
import qs from 'qs';
import { cmsFetcher } from '@/app/services/http';
import { Novedades } from '../definitions';
import { motion, AnimatePresence } from 'framer-motion';

const getImageUrl = (entry: Novedades) => {
    const url = entry?.media?.[0]?.url;
    return url ? `${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${url}` : '';
};

const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-MX', options);
};

export default function Articulos() {
    const [page, setPage] = useState(1);

    const queryParams = qs.stringify({
        sort: ['publishedAt:desc'],
        pagination: {
            page: page,
            pageSize: 6,
        },
        populate: '*'
    }, { encodeValuesOnly: true });

    const { data, error, isLoading } = useSWR<{
        data: Novedades[],
        meta: { pagination: { pageCount: number, total: number } }
    }>(`/entries?${queryParams.toString()}`, cmsFetcher);

    const handlePageChange = (_: ChangeEvent<unknown>, val: number) => {
        setPage(val);
    };

    if (error) {
        return <Alert severity="error">Hubo un error al obtener las publicaciones</Alert>;
    }

    return (
        <Box sx={{ mb: 8 }}>
            <Typography variant="h5" component="h2" fontWeight={700} sx={{ mb: 3 }}>
                Publicaciones Recientes
            </Typography>

            {isLoading ? (
                <Typography>Cargando publicaciones...</Typography>
            ) : (
                <>
                    <AnimatePresence mode="popLayout">
                        <Grid
                            container
                            spacing={4}
                            component={motion.div}
                            key={page}
                        >
                            {data?.data.map((item) => (
                                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.3 }}
                                        style={{ height: '100%' }}
                                    >
                                        <Link href={`/editorial/${item.slug}`} style={{ textDecoration: 'none' }} aria-label={`Leer artículo: ${item.title}`}>
                                            <Card sx={{
                                                height: '100%',
                                                borderRadius: 3,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                transition: 'transform 0.2s, box-shadow 0.2s',
                                                '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 }
                                            }}>
                                                <CardMedia
                                                    component="img"
                                                    height="200"
                                                    image={getImageUrl(item)}
                                                    alt={`Imagen de ${item.title}`}
                                                    sx={{ bgcolor: 'grey.300', objectFit: 'cover' }}
                                                    loading="lazy"
                                                />
                                                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>

                                                    {item.tags && item.tags.length > 0 && (
                                                        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
                                                            {item.tags?.map((tag) => (
                                                                <Chip
                                                                    key={tag.id}
                                                                    label={tag.name}
                                                                    size="small"
                                                                    variant="outlined"
                                                                    sx={{
                                                                        borderColor: tag.hexColor,
                                                                        color: tag.hexColor,
                                                                        margin: '0 !important',
                                                                        marginBottom: '8px !important'
                                                                    }}
                                                                />
                                                            ))}
                                                        </Stack>
                                                    )}

                                                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2, color: 'text.secondary' }}>
                                                        <AccessTimeIcon fontSize="small" />
                                                        <Typography variant="caption">
                                                            {formatDate(item.publishedAt)}
                                                            {item.autors?.[0]?.nombre ? ` • ${item.autors[0].nombre}` : ''}
                                                        </Typography>
                                                    </Stack>

                                                    <Typography variant="h6" component="h3" fontWeight={700} sx={{ mb: 1, color: 'text.primary', lineHeight: 1.3 }}>
                                                        {item.title}
                                                    </Typography>

                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                        sx={{
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 3,
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden',
                                                        }}
                                                    >
                                                        {item.description}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </motion.div>
                                </Grid>
                            ))}
                        </Grid>
                    </AnimatePresence>

                    {data?.meta && (
                        <Stack alignItems="center" sx={{ mt: 8 }}>
                            <Pagination
                                page={page}
                                onChange={handlePageChange}
                                count={data.meta.pagination.pageCount}
                                color="primary"
                                size="large"
                            />
                        </Stack>
                    )}
                </>
            )}
        </Box>
    );
}