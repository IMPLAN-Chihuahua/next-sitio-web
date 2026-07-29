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
import { ClasificacionSpan } from '@/app/estudios-y-propuestas/components/Tile';
import { Image, Landscape } from '@mui/icons-material';
import { parse } from 'date-fns';

const getImageUrl = (entry: Novedades) => {
    const url = entry?.cover?.url;
    return url ? `${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${url}` : '';
};

const dateFormatOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('es-MX', dateFormatOptions);
};

export default function Articulos() {
    const [page, setPage] = useState(1);

    const queryParams = qs.stringify({
        sort: ['fechaPublicacion:desc'],
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
            <Typography
                variant="h5"
                component={'h4'}
                fontWeight={700}
                sx={{
                    color: 'text.primary',
                    letterSpacing: '-1px'
                }}
            >
                Publicaciones recientes
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
                                <Grid size={{ xs: 12, sm: 6, md: 4 }} height={420} position='relative' key={item.id}>
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
                                                bgcolor: '#ffffff',
                                                height: '100%',
                                                borderRadius: 1,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                transition: 'transform 0.2s, box-shadow 0.2s',
                                                '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 }
                                            }}>
                                                {
                                                    item.cover ? (
                                                        <CardMedia
                                                            component="img"
                                                            height="200px"
                                                            image={getImageUrl(item)}
                                                            alt={`Imagen de ${item.title}`}
                                                            sx={{
                                                                bgcolor: 'grey.300',
                                                                objectFit: 'cover',
                                                                flex: 1,
                                                            }}
                                                            loading="lazy"
                                                        />

                                                    ) : (
                                                        <Box
                                                            sx={{
                                                                minHeight: '200px',
                                                                flex: 1,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                bgcolor: 'grey.300'
                                                            }}
                                                        >
                                                            <Landscape sx={{ fontSize: 50, color: 'grey.700' }} />
                                                        </Box>
                                                    )
                                                }
                                                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                                    <Typography
                                                        variant="h6"
                                                        component="h3"
                                                        fontWeight={600}
                                                        sx={{
                                                            color: '#111827',
                                                            mb: 1,
                                                            // color: 'text.primary',
                                                            lineHeight: 1.3,
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: 'vertical',
                                                            wordBreak: 'break-word',
                                                            overflow: 'hidden'
                                                        }}>
                                                        {item.title}
                                                    </Typography>
                                                    <Typography variant="body2" mb={2}>
                                                        {item.autor && item.autor.length > 0 && ` ${item.autor[0]?.nombres} ${item.autor[0]?.apellidos} • `}
                                                        {parse(item.fechaPublicacion, 'yyyy-MM-dd', new Date()).toLocaleDateString('es-MX', dateFormatOptions)}
                                                    </Typography>
                                                    <Box
                                                        mt={'auto'}
                                                    >

                                                        {item.tags && item.tags.length > 0 && (
                                                            <Stack direction="row" sx={{ mb: 1, flexWrap: 'wrap', columnGap: 1.5, rowGap: .5 }}>
                                                                {item.tags?.map((tag) => (
                                                                    <ClasificacionSpan
                                                                        key={tag.id}
                                                                        clasificacion={{
                                                                            hexColor: tag.hexColor,
                                                                            name: tag.name
                                                                        }}
                                                                    />
                                                                ))}
                                                            </Stack>
                                                        )}

                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                color: '#333333',
                                                                display: '-webkit-box',
                                                                WebkitLineClamp: 3,
                                                                WebkitBoxOrient: 'vertical',
                                                                overflow: 'hidden',
                                                            }}
                                                        >
                                                            {item.description}
                                                        </Typography>
                                                    </Box>
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